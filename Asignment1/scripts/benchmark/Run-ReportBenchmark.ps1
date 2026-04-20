param(
  [Parameter(Mandatory = $false)]
  [string]$BaseUrl = "http://localhost:8080",

  [Parameter(Mandatory = $false)]
  [string]$BearerToken = "",

  [Parameter(Mandatory = $false)]
  [ValidateSet("pdf", "xlsx")]
  [string]$Format = "pdf",

  [Parameter(Mandatory = $false)]
  [string]$Columns = "username,email,first_name,last_name,dob",

  [Parameter(Mandatory = $false)]
  [ValidateSet("100k", "500k", "1m")]
  [string]$DatasetLabel = "100k",

  [Parameter(Mandatory = $false)]
  [int[]]$ConcurrencyList = @(1, 2, 4),

  [Parameter(Mandatory = $false)]
  [int]$Iterations = 2,

  [Parameter(Mandatory = $false)]
  [int]$SampleIntervalMs = 1000,

  [Parameter(Mandatory = $false)]
  [int]$AppPid = 0,

  [Parameter(Mandatory = $false)]
  [string]$OutputDir = ".\benchmark-results"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function New-RequestHeaders {
  param([string]$Token)
  $headers = @{}
  if (-not [string]::IsNullOrWhiteSpace($Token)) {
    $headers["Authorization"] = "Bearer $Token"
  }
  return $headers
}

function Get-EndpointPath {
  param(
    [string]$ReportFormat,
    [string]$SelectedColumns
  )

  return "/api/reports/users-db/large/$ReportFormat?columns=$SelectedColumns"
}

function Start-MetricsSampler {
  param(
    [int]$Pid,
    [int]$IntervalMs,
    [string]$MetricsPath
  )

  if ($Pid -le 0) {
    return $null
  }

  $jobScript = {
    param($InnerPid, $InnerIntervalMs, $InnerMetricsPath)

    while ($true) {
      try {
        $proc = Get-Process -Id $InnerPid -ErrorAction Stop
        $sample = [pscustomobject]@{
          timestamp = (Get-Date).ToString("o")
          cpuSeconds = [double]$proc.CPU
          workingSetMb = [math]::Round(($proc.WorkingSet64 / 1MB), 2)
          privateMemoryMb = [math]::Round(($proc.PrivateMemorySize64 / 1MB), 2)
        }
        $sample | ConvertTo-Json -Compress | Add-Content -Path $InnerMetricsPath -Encoding UTF8
        Start-Sleep -Milliseconds $InnerIntervalMs
      } catch {
        break
      }
    }
  }

  return Start-Job -ScriptBlock $jobScript -ArgumentList $Pid, $IntervalMs, $MetricsPath
}

function Stop-MetricsSampler {
  param($Job)
  if ($null -ne $Job) {
    Stop-Job -Job $Job -ErrorAction SilentlyContinue | Out-Null
    Receive-Job -Job $Job -ErrorAction SilentlyContinue | Out-Null
    Remove-Job -Job $Job -Force -ErrorAction SilentlyContinue | Out-Null
  }
}

function Read-MetricsSummary {
  param([string]$MetricsPath)

  if (-not (Test-Path $MetricsPath)) {
    return @{
      peakWorkingSetMb = 0
      avgWorkingSetMb = 0
      cpuDeltaSeconds = 0
    }
  }

  $lines = Get-Content -Path $MetricsPath -ErrorAction SilentlyContinue
  if ($null -eq $lines -or $lines.Count -eq 0) {
    return @{
      peakWorkingSetMb = 0
      avgWorkingSetMb = 0
      cpuDeltaSeconds = 0
    }
  }

  $samples = @($lines | ForEach-Object { $_ | ConvertFrom-Json })
  $workingSets = @($samples | ForEach-Object { [double]$_.workingSetMb })
  $cpuValues = @($samples | ForEach-Object { [double]$_.cpuSeconds })

  $avgWs = ($workingSets | Measure-Object -Average).Average
  $peakWs = ($workingSets | Measure-Object -Maximum).Maximum
  $cpuDelta = 0
  if ($cpuValues.Count -gt 1) {
    $cpuDelta = $cpuValues[-1] - $cpuValues[0]
  }

  return @{
    peakWorkingSetMb = [math]::Round($peakWs, 2)
    avgWorkingSetMb = [math]::Round($avgWs, 2)
    cpuDeltaSeconds = [math]::Round($cpuDelta, 2)
  }
}

function Invoke-DownloadOnce {
  param(
    [string]$RequestUrl,
    [hashtable]$Headers,
    [string]$OutputPath,
    [int]$Pid,
    [int]$IntervalMs
  )

  $metricsPath = [System.IO.Path]::ChangeExtension($OutputPath, ".metrics.jsonl")
  $samplerJob = Start-MetricsSampler -Pid $Pid -IntervalMs $IntervalMs -MetricsPath $metricsPath
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  $statusCode = 0

  try {
    Invoke-WebRequest -Uri $RequestUrl -Headers $Headers -OutFile $OutputPath -Method Get | Out-Null
    $statusCode = 200
  } catch {
    $statusCode = 500
  } finally {
    $sw.Stop()
    Stop-MetricsSampler -Job $samplerJob
  }

  $metrics = Read-MetricsSummary -MetricsPath $metricsPath
  $fileSizeMb = 0
  if (Test-Path $OutputPath) {
    $fileInfo = Get-Item $OutputPath
    $fileSizeMb = [math]::Round(($fileInfo.Length / 1MB), 2)
  }

  return [pscustomobject]@{
    statusCode = $statusCode
    durationMs = $sw.ElapsedMilliseconds
    fileSizeMb = $fileSizeMb
    peakWorkingSetMb = $metrics.peakWorkingSetMb
    avgWorkingSetMb = $metrics.avgWorkingSetMb
    cpuDeltaSeconds = $metrics.cpuDeltaSeconds
    outputPath = $OutputPath
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$sessionDir = Join-Path $OutputDir "run-$DatasetLabel-$Format-$timestamp"
New-Item -Path $sessionDir -ItemType Directory -Force | Out-Null

$headers = New-RequestHeaders -Token $BearerToken
$path = Get-EndpointPath -ReportFormat $Format -SelectedColumns $Columns
$requestUrl = "$BaseUrl$path"

$results = New-Object System.Collections.Generic.List[object]

foreach ($concurrency in $ConcurrencyList) {
  foreach ($iteration in 1..$Iterations) {
    Write-Host "Running concurrency=$concurrency iteration=$iteration ..."
    $jobs = @()
    $batchStart = [System.Diagnostics.Stopwatch]::StartNew()

    for ($index = 1; $index -le $concurrency; $index++) {
      $artifactName = "c${concurrency}-i${iteration}-r${index}.$Format"
      $artifactPath = Join-Path $sessionDir $artifactName

      $jobs += Start-Job -ScriptBlock {
        param($InnerUrl, $InnerHeaders, $InnerOutputPath, $InnerPid, $InnerSampleIntervalMs)
        Set-StrictMode -Version Latest
        $ErrorActionPreference = "Stop"

        function Start-MetricsSampler {
          param([int]$Pid, [int]$IntervalMs, [string]$MetricsPath)
          if ($Pid -le 0) { return $null }
          return Start-Job -ScriptBlock {
            param($P, $I, $M)
            while ($true) {
              try {
                $proc = Get-Process -Id $P -ErrorAction Stop
                [pscustomobject]@{
                  timestamp = (Get-Date).ToString("o")
                  cpuSeconds = [double]$proc.CPU
                  workingSetMb = [math]::Round(($proc.WorkingSet64 / 1MB), 2)
                  privateMemoryMb = [math]::Round(($proc.PrivateMemorySize64 / 1MB), 2)
                } | ConvertTo-Json -Compress | Add-Content -Path $M -Encoding UTF8
                Start-Sleep -Milliseconds $I
              } catch { break }
            }
          } -ArgumentList $Pid, $IntervalMs, $MetricsPath
        }

        function Stop-MetricsSampler {
          param($Job)
          if ($null -ne $Job) {
            Stop-Job -Job $Job -ErrorAction SilentlyContinue | Out-Null
            Receive-Job -Job $Job -ErrorAction SilentlyContinue | Out-Null
            Remove-Job -Job $Job -Force -ErrorAction SilentlyContinue | Out-Null
          }
        }

        function Read-MetricsSummary {
          param([string]$MetricsPath)
          if (-not (Test-Path $MetricsPath)) { return @{ peakWorkingSetMb = 0; avgWorkingSetMb = 0; cpuDeltaSeconds = 0 } }
          $lines = Get-Content -Path $MetricsPath -ErrorAction SilentlyContinue
          if ($null -eq $lines -or $lines.Count -eq 0) { return @{ peakWorkingSetMb = 0; avgWorkingSetMb = 0; cpuDeltaSeconds = 0 } }
          $samples = @($lines | ForEach-Object { $_ | ConvertFrom-Json })
          $ws = @($samples | ForEach-Object { [double]$_.workingSetMb })
          $cpu = @($samples | ForEach-Object { [double]$_.cpuSeconds })
          $avgWs = ($ws | Measure-Object -Average).Average
          $peakWs = ($ws | Measure-Object -Maximum).Maximum
          $cpuDelta = 0
          if ($cpu.Count -gt 1) { $cpuDelta = $cpu[-1] - $cpu[0] }
          return @{
            peakWorkingSetMb = [math]::Round($peakWs, 2)
            avgWorkingSetMb = [math]::Round($avgWs, 2)
            cpuDeltaSeconds = [math]::Round($cpuDelta, 2)
          }
        }

        $metricsPath = [System.IO.Path]::ChangeExtension($InnerOutputPath, ".metrics.jsonl")
        $samplerJob = Start-MetricsSampler -Pid $InnerPid -IntervalMs $InnerSampleIntervalMs -MetricsPath $metricsPath
        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        $statusCode = 0
        try {
          Invoke-WebRequest -Uri $InnerUrl -Headers $InnerHeaders -OutFile $InnerOutputPath -Method Get | Out-Null
          $statusCode = 200
        } catch {
          $statusCode = 500
        } finally {
          $sw.Stop()
          Stop-MetricsSampler -Job $samplerJob
        }

        $metrics = Read-MetricsSummary -MetricsPath $metricsPath
        $fileSizeMb = 0
        if (Test-Path $InnerOutputPath) {
          $fileInfo = Get-Item $InnerOutputPath
          $fileSizeMb = [math]::Round(($fileInfo.Length / 1MB), 2)
        }

        return [pscustomobject]@{
          statusCode = $statusCode
          durationMs = $sw.ElapsedMilliseconds
          fileSizeMb = $fileSizeMb
          peakWorkingSetMb = $metrics.peakWorkingSetMb
          avgWorkingSetMb = $metrics.avgWorkingSetMb
          cpuDeltaSeconds = $metrics.cpuDeltaSeconds
          outputPath = $InnerOutputPath
        }
      } -ArgumentList $requestUrl, $headers, $artifactPath, $AppPid, $SampleIntervalMs
    }

    Wait-Job -Job $jobs | Out-Null
    $batchResults = $jobs | ForEach-Object { Receive-Job -Job $_ }
    $jobs | Remove-Job -Force | Out-Null
    $batchStart.Stop()

    foreach ($entry in $batchResults) {
      $results.Add([pscustomobject]@{
        dataset = $DatasetLabel
        format = $Format
        concurrency = $concurrency
        iteration = $iteration
        statusCode = $entry.statusCode
        durationMs = $entry.durationMs
        fileSizeMb = $entry.fileSizeMb
        peakWorkingSetMb = $entry.peakWorkingSetMb
        avgWorkingSetMb = $entry.avgWorkingSetMb
        cpuDeltaSeconds = $entry.cpuDeltaSeconds
        outputPath = $entry.outputPath
      }) | Out-Null
    }

    $okCount = @($batchResults | Where-Object { $_.statusCode -eq 200 }).Count
    Write-Host "Batch done in $($batchStart.ElapsedMilliseconds)ms, success=$okCount/$concurrency"
  }
}

$jsonPath = Join-Path $sessionDir "summary.json"
$csvPath = Join-Path $sessionDir "summary.csv"
$results | ConvertTo-Json -Depth 4 | Set-Content -Path $jsonPath -Encoding UTF8
$results | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8

$durations = @($results | Select-Object -ExpandProperty durationMs)
$p50 = 0
$p95 = 0
if ($durations.Count -gt 0) {
  $sortedDurations = $durations | Sort-Object
  $midIdx = [math]::Floor(($sortedDurations.Count - 1) * 0.5)
  $p95Idx = [math]::Floor(($sortedDurations.Count - 1) * 0.95)
  $p50 = $sortedDurations[$midIdx]
  $p95 = $sortedDurations[$p95Idx]
}

Write-Host ""
Write-Host "=== BENCHMARK DONE ==="
Write-Host "Output folder: $sessionDir"
Write-Host "Total samples: $($results.Count)"
Write-Host "p50(ms): $p50"
Write-Host "p95(ms): $p95"
Write-Host "Summary CSV: $csvPath"
Write-Host "Summary JSON: $jsonPath"
