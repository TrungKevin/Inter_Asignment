package org.example.camunda.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.camunda.dto.request.TaskCompleteRequest;
import org.example.camunda.dto.response.TaskResponseDTO;
import org.example.camunda.service.CamundaTaskApplicationService;
import org.example.dto.response.ApiResponse;
import org.example.exception.AppException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/camunda/tasks")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class CamundaTaskController {

    private final CamundaTaskApplicationService camundaTaskApplicationService;

    // 1. GET: Lấy danh sách task chờ duyệt
    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponseDTO>>> getPendingTasks(
            Authentication authentication,
            @RequestParam(required = false) String assignee,//lấy assignee từ request param
            @RequestParam(required = false) String candidateGroup,
            @RequestParam(required = false) Long requestId,
            @RequestParam(required = false) String taskDefinitionKey) {
        List<TaskResponseDTO> response = camundaTaskApplicationService.getPendingTasks(//gọi service để lấy danh sách task chờ duyệt
                authentication,
                assignee,
                candidateGroup,
                requestId,
                taskDefinitionKey
        );

        return ResponseEntity.ok(
                ApiResponse.<List<TaskResponseDTO>>builder()
                        .result(response)
                        .build()
        );
    }

    // 2. POST: Hoàn thành task (Duyệt/Từ chối) — biến approved bắt buộc cho gateway BPMN
    @PostMapping("/{taskId}/complete")
    public ResponseEntity<ApiResponse<String>> completeTask(
            Authentication authentication,
            @PathVariable String taskId,
            @RequestBody(required = false) TaskCompleteRequest request) {
        try {
            camundaTaskApplicationService.completeTask(taskId, request, authentication);//gọi service để hoàn thành task
        } catch (AppException exception) {
            throw exception;
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.<String>builder()
                            .code(4001)
                            .message(exception.getMessage())
                            .build()
            );
        } catch (NoSuchElementException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    ApiResponse.<String>builder()
                            .code(4041)
                            .message("Khong tim thay task runtime (co the da hoan thanh hoac da bi xoa).")
                            .build()
            );
        } catch (Exception exception) {
            log.error("Failed to complete Camunda task taskId={}", taskId, exception);//nếu có lỗi thì log lỗi
            return ResponseEntity.internalServerError().body(
                    ApiResponse.<String>builder()
                            .code(5001)
                            .message("Error completing task: " + exception.getMessage())
                            .build()
            );
        }

        return ResponseEntity.ok(//nếu hoàn thành task thành công thì trả về 200
                ApiResponse.<String>builder()
                        .message("Task completed successfully. Path updated.")
                        .build()
        );
    }
}