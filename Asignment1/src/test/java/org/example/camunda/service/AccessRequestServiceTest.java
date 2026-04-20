package org.example.camunda.service;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.example.camunda.entity.AccessRequest;
import org.example.camunda.entity.AccessRequestLine;
import org.example.camunda.entity.RequestHistory;
import org.example.camunda.repository.AccessRequestLineRepository;
import org.example.camunda.repository.AccessRequestRepository;
import org.example.camunda.repository.DepartmentRepository;
import org.example.camunda.repository.RequestHistoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccessRequestServiceTest {

    @Mock
    private RuntimeService runtimeService;

    @Mock
    private AccessRequestRepository repository;

    @Mock
    private AccessRequestLineRepository lineRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private RequestHistoryRepository historyRepository;

    @Mock
    private KeycloakProvisionService keycloakProvisionService;

    @InjectMocks
    private AccessRequestService accessRequestService;

    @Test
    void handleProvisionDecision_whenKeycloakThrows_shouldSetProvisionFailedAndRaiseBpmnError() {
        AccessRequest request = AccessRequest.builder()
                .requestId(100L)
                .requesterUsername("admin")
                .payload(Map.of("roles", List.of("admin")))
                .status("PENDING_APPROVAL")
                .build();

        when(repository.findById(100L)).thenReturn(Optional.of(request));
        doThrow(new RuntimeException("403 Forbidden"))
                .when(keycloakProvisionService)
                .assignRolesToUser(eq("admin"), anyList());

        assertThatThrownBy(() -> accessRequestService.handleProvisionDecision(100L, true, "approve"))
                .isInstanceOf(BpmnError.class);

        assertThat(request.getStatus()).isEqualTo("PROVISION_FAILED");
        assertThat(request.getRejection_reason()).contains("failed=");

        verify(repository, times(2)).save(request);
        verify(lineRepository, times(1)).save(org.mockito.ArgumentMatchers.any(AccessRequestLine.class));

        ArgumentCaptor<RequestHistory> historyCaptor = ArgumentCaptor.forClass(RequestHistory.class);
        verify(historyRepository, times(2)).save(historyCaptor.capture());
        List<RequestHistory> savedHistory = historyCaptor.getAllValues();
        assertThat(savedHistory).extracting(RequestHistory::getAction)
                .containsExactly("PROVISION_START", "PROVISION_FAIL");
    }

    @Test
    void handleProvisionDecision_whenApprovedAndKeycloakSuccess_shouldSetProvisioned() {
        AccessRequest request = AccessRequest.builder()
                .requestId(101L)
                .requesterUsername("admin")
                .payload(Map.of("roles", List.of("admin")))
                .status("PENDING_APPROVAL")
                .build();

        when(repository.findById(101L)).thenReturn(Optional.of(request));
        doNothing().when(keycloakProvisionService).assignRolesToUser(eq("admin"), anyList());

        accessRequestService.handleProvisionDecision(101L, true, "approve");

        assertThat(request.getStatus()).isEqualTo("PROVISIONED");
        assertThat(request.getRejection_reason()).isNull();
        verify(lineRepository, times(1)).save(org.mockito.ArgumentMatchers.any(AccessRequestLine.class));

        ArgumentCaptor<RequestHistory> historyCaptor = ArgumentCaptor.forClass(RequestHistory.class);
        verify(historyRepository, times(2)).save(historyCaptor.capture());
        List<RequestHistory> savedHistory = historyCaptor.getAllValues();
        assertThat(savedHistory).extracting(RequestHistory::getAction)
                .containsExactly("PROVISION_START", "PROVISION_OK");
    }
}
