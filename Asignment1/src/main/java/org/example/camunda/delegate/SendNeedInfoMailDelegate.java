package org.example.camunda.delegate;

import lombok.RequiredArgsConstructor;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.example.camunda.service.AccessRequestNotificationService;
import org.springframework.stereotype.Component;

@Component("sendNeedInfoMailDelegate")
@RequiredArgsConstructor
//•	Gửi mail Need Info
public class SendNeedInfoMailDelegate implements JavaDelegate {

  private final AccessRequestNotificationService notificationService;

  @Override
  public void execute(DelegateExecution execution) {
    Object requestIdRaw = execution.getVariable("requestId");
    if (!(requestIdRaw instanceof Number requestIdNumber)) {
      throw new IllegalArgumentException("Missing or invalid process variable: requestId");
    }

    Long requestId = requestIdNumber.longValue();
    String comment = (String) execution.getVariable("comment");
    notificationService.sendNeedInfoNotification(requestId, comment);
  }
}
