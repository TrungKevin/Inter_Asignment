package org.example.service.jasper.strategy;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
//class này để resolve strategy export report cho từng định dạng
//strategy là một interface để export report
public class ReportExportStrategyResolver {

    private final Map<String, ReportExportStrategy> strategiesByFormat;
    
    public ReportExportStrategyResolver(List<ReportExportStrategy> strategies) {
        this.strategiesByFormat = strategies.stream()
                .collect(Collectors.toMap(
                        strategy -> strategy.getFormat().toLowerCase(Locale.ROOT),
                        Function.identity()
                ));
    }

    public ReportExportStrategy resolve(String format) {
        if (format == null) {
            throw new IllegalArgumentException("Format is required");
        }
        ReportExportStrategy strategy = strategiesByFormat.get(format.toLowerCase(Locale.ROOT));
        if (strategy == null) {
            throw new IllegalArgumentException("Unsupported format: " + format);
        }
        return strategy;
    }
}
