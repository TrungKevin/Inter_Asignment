package org.example.camunda.controller;

import lombok.RequiredArgsConstructor;
import org.example.camunda.dto.request.AccessRequestDTO;
import org.example.camunda.dto.response.AccessRequestDetailResponse;
import org.example.camunda.dto.response.AccessRequestMineItemResponse;
import org.example.camunda.entity.AccessRequest;
import org.example.camunda.service.AccessRequestQueryService;
import org.example.camunda.service.AccessRequestService;
import org.example.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/access-requests")
@RequiredArgsConstructor
public class AccessRequestController {

    private final AccessRequestService accessRequestService;
    private final AccessRequestQueryService accessRequestQueryService;

    @PostMapping({"", "/submit"})
    public ResponseEntity<AccessRequest> submitRequest(@RequestBody AccessRequestDTO dto) {
        // Gọi service để vừa lưu DB vừa Start Camunda
        AccessRequest result = accessRequestService.createRequestAndStartProcess(dto);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/mine")//phiếu của user thấy được của mình
    public ResponseEntity<ApiResponse<List<AccessRequestMineItemResponse>>> getMyRequests(Authentication authentication) {
        List<AccessRequestMineItemResponse> result = accessRequestQueryService.getMyRequests(authentication);

        return ResponseEntity.ok(ApiResponse.<List<AccessRequestMineItemResponse>>builder()
                .result(result)
                .build());
    }

    @GetMapping("/{id}")//chi tiết yêu cầu của user
    public ResponseEntity<ApiResponse<AccessRequestDetailResponse>> getRequestDetail(
            @PathVariable Long id,
            Authentication authentication
    ) {
        AccessRequestDetailResponse detail = accessRequestQueryService.getRequestDetail(id, authentication);

        return ResponseEntity.ok(ApiResponse.<AccessRequestDetailResponse>builder()
                .result(detail)
                .build());
    }

}