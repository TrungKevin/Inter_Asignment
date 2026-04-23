package org.example.camunda.service;

import lombok.RequiredArgsConstructor;
import org.example.camunda.dto.response.AccessRequestDetailResponse;
import org.example.camunda.dto.response.AccessRequestHistoryItemResponse;
import org.example.camunda.dto.response.AccessRequestLineItemResponse;
import org.example.camunda.dto.response.AccessRequestMineItemResponse;
import org.example.camunda.entity.AccessRequest;
import org.example.camunda.entity.AccessRequestLine;
import org.example.camunda.entity.RequestHistory;
import org.example.camunda.repository.AccessRequestLineRepository;
import org.example.camunda.repository.AccessRequestRepository;
import org.example.camunda.repository.RequestHistoryRepository;
import org.example.exception.AppException;
import org.example.exception.ErrorCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessRequestQueryService {// service để lấy danh sách yêu cầu của user và chi tiết yêu cầu của user

    private final AccessRequestRepository accessRequestRepository;
    private final RequestHistoryRepository requestHistoryRepository;
    private final AccessRequestLineRepository accessRequestLineRepository;

    public List<AccessRequestMineItemResponse> getMyRequests(Authentication authentication) {
        String username = resolveUsername(authentication);//
        return accessRequestRepository
                .findByRequesterUsernameOrderByCreatedAtDesc(username)
                .stream()
                .map(this::toMineItem)
                .toList();
    }

    //hàm này để lấy chi tiết yêu cầu của user
    public AccessRequestDetailResponse getRequestDetail(Long requestId, Authentication authentication) {
        AccessRequest request = accessRequestRepository.findById(requestId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        String currentUsername = resolveUsername(authentication);
        boolean isOwner = request.getRequesterUsername() != null
                && request.getRequesterUsername().equalsIgnoreCase(currentUsername);//nếu request owner là user hiện tại thì true
        boolean isPrivileged = authentication != null
                && authentication.getAuthorities().stream().anyMatch(a ->
                "ROLE_admin".equalsIgnoreCase(a.getAuthority())
                        || "ROLE_auditor".equalsIgnoreCase(a.getAuthority()));

        if (!isOwner && !isPrivileged) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        List<AccessRequestHistoryItemResponse> history = requestHistoryRepository//lấy lịch sử yêu cầu
                .findByRequestIdOrderByCreatedAtAsc(requestId)
                .stream()
                .map(this::toHistoryItem)
                .toList();

        List<AccessRequestLineItemResponse> lines = accessRequestLineRepository//lấy danh sách quyền của yêu cầu là list các quyền của yêu cầu
                .findByRequestIdOrderByLineIdAsc(requestId)
                .stream()
                .map(this::toLineItem)
                .toList();

        return AccessRequestDetailResponse.builder()//tạo object DTO chi tiết yêu cầu
                .requestId(request.getRequestId())
                .businessKey(request.getBusinessKey())
                .processInstanceId(request.getProcessInstanceId())
                .requesterUsername(request.getRequesterUsername())
                .departmentCode(request.getDepartmentCode())
                .status(request.getStatus())
                .rejectionReason(request.getRejection_reason())
                .createdAt(request.getCreatedAt())
                .updatedAt(request.getUpdatedAt())
                .payload(request.getPayload())
                .history(history)
                .lines(lines)
                .build();
    }

    private String resolveUsername(Authentication authentication) {//lấy username từ authentication
        if (authentication instanceof JwtAuthenticationToken jwtAuth) {//
            String preferredUsername = jwtAuth.getToken().getClaimAsString("preferred_username");
            if (preferredUsername != null && !preferredUsername.isBlank()) {
                return preferredUsername;
            }
        }
        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {
            return authentication.getName();
        }
        return "";
    }

    private AccessRequestMineItemResponse toMineItem(AccessRequest request) {//chuyển đổi từ entity sang DTO
        String status = request.getStatus();
        String feedback = null;
        if ("NEED_MORE_INFO".equals(status) || "COUNTER_PROPOSED".equals(status)) {
            feedback = request.getRejection_reason();
        }
        return AccessRequestMineItemResponse.builder()//tạo object DTO
                .requestId(request.getRequestId())
                .businessKey(request.getBusinessKey())
                .processInstanceId(request.getProcessInstanceId())
                .requesterUsername(request.getRequesterUsername())
                .departmentCode(request.getDepartmentCode())
                .status(status)
                .createdAt(request.getCreatedAt())
                .updatedAt(request.getUpdatedAt())
                .adminFeedback(feedback)
                .build();
    }

    private AccessRequestHistoryItemResponse toHistoryItem(RequestHistory history) {
        return AccessRequestHistoryItemResponse.builder()
                .id(history.getId())
                .actorUsername(history.getActorUsername())
                .action(history.getAction())
                .comment(history.getComment())
                .createdAt(history.getCreatedAt())
                .build();
    }

    private AccessRequestLineItemResponse toLineItem(AccessRequestLine line) {
        return AccessRequestLineItemResponse.builder()
                .lineId(line.getLineId())
                .roleCode(line.getRoleCode())
                .resourceType(line.getResourceType())
                .provisionStatus(line.getProvisionStatus())
                .errorMessage(line.getErrorMessage())
                .createdAt(line.getCreatedAt())
                .updatedAt(line.getUpdatedAt())
                .build();
    }
}
