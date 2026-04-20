package org.example.camunda.delegate;

import lombok.RequiredArgsConstructor;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.example.camunda.service.AccessRequestService;
import org.springframework.stereotype.Component;

@Component("provisionAccessDelegate")
@RequiredArgsConstructor //Delegate của Camunda dùng để chạy logic nghiệp vụ khi process đi tới Service Task Provision Access
public class ProvisionAccessDelegate implements JavaDelegate {
     //“cầu nối” giữa BPMN engine và service business
    private final AccessRequestService accessRequestService;

    @Override
    public void execute(DelegateExecution execution) {
        Object requestIdRaw = execution.getVariable("requestId");
        if (!(requestIdRaw instanceof Number requestIdNumber)) {
            throw new IllegalArgumentException("Missing or invalid process variable: requestId");
        }

        Long requestId = requestIdNumber.longValue();//lấy requestId từ execution variables
        Boolean approved = (Boolean) execution.getVariable("approved");//provisioning quyền
        String comment = (String) execution.getVariable("comment");

        accessRequestService.handleProvisionDecision(//gọi service để xử lý quyền
                requestId,
                Boolean.TRUE.equals(approved),//nếu approved là true thì gọi service để xử lý quyền
                comment//comment là comment của user khi duyệt quyền
        );
    }
}
