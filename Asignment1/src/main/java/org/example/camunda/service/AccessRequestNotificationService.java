package org.example.camunda.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.camunda.entity.AccessRequest;
import org.example.camunda.repository.AccessRequestRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;


@Service
@RequiredArgsConstructor
@Slf4j
public class AccessRequestNotificationService {
  private final AccessRequestRepository accessRequestRepository;
  private final JavaMailSender mailSender;

  public void sendDecisionNotification(Long requestId, boolean approved, String comment) {
    AccessRequest request = accessRequestRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy requestId: " + requestId));

    String recipient = resolveRecipient(request);
    String outcome = approved ? "APPROVED" : "REJECTED";
    String message = buildMessage(request, approved, comment);

    // Gửi mail thật bằng JavaMailSender
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
      helper.setTo(recipient);
      helper.setSubject("Kết quả phê duyệt yêu cầu cấp quyền");
      helper.setText(message, false);
      mailSender.send(mimeMessage);
      log.info("Đã gửi email thành công tới {} (requestId={})", recipient, requestId);
    } catch (MessagingException e) {
      log.error("Gửi email thất bại tới {} (requestId={})", recipient, requestId, e);
    }
  }

  public void sendNeedInfoNotification(Long requestId, String comment) {
    AccessRequest request = accessRequestRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy requestId: " + requestId));

    String recipient = resolveRecipient(request);
    String message = buildNeedInfoMessage(request, comment);

    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
      helper.setTo(recipient);
      helper.setSubject("Yêu cầu bổ sung thông tin cho request cấp quyền");
      helper.setText(message, false);
      mailSender.send(mimeMessage);
      log.info("Đã gửi need-info email thành công tới {} (requestId={})", recipient, requestId);
    } catch (MessagingException e) {
      log.error("Gửi need-info email thất bại tới {} (requestId={})", recipient, requestId, e);
    }
  }

  public void sendCounterProposalNotification(Long requestId, String comment) {
    AccessRequest request = accessRequestRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy requestId: " + requestId));

    String recipient = resolveRecipient(request);
    String message = buildCounterProposalMessage(request, comment);

    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
      helper.setTo(recipient);
      helper.setSubject("Admin gửi đề xuất điều chỉnh quyền");
      helper.setText(message, false);
      mailSender.send(mimeMessage);
      log.info("Đã gửi counter-proposal email thành công tới {} (requestId={})", recipient, requestId);
    } catch (MessagingException e) {
      log.error("Gửi counter-proposal email thất bại tới {} (requestId={})", recipient, requestId, e);
    }
  }

  private String resolveRecipient(AccessRequest request) {
    Map<String, Object> payload = request.getPayload();
    if (payload != null) {
      String email = Objects.toString(payload.get("email"), "").trim();
      if (!email.isEmpty()) {
        return email;
      }
    }
    return request.getRequesterUsername();
  }

  private String buildMessage(AccessRequest request, boolean approved, String comment) {
    String base = approved
        ? "Yeu cau cap quyen da duoc phe duyet."
        : "Yeu cau cap quyen da bi tu choi.";
    String reason = Objects.toString(comment, "").trim();
    if (reason.isEmpty()) {
      return base + " Ma request: " + request.getBusinessKey() + ".";
    }
    return base + " Ma request: " + request.getBusinessKey() + ". Ly do: " + reason + ".";
  }

  private String buildNeedInfoMessage(AccessRequest request, String comment) {
    String reason = Objects.toString(comment, "").trim();
    String base = "Admin yêu cầu bạn bổ sung thêm thông tin cho request cấp quyền.";
    if (reason.isEmpty()) {
      return base + " Ma request: " + request.getBusinessKey() + ".";
    }
    return base + " Ma request: " + request.getBusinessKey() + ". Noi dung can bo sung: " + reason + ".";
  }

  private String buildCounterProposalMessage(AccessRequest request, String comment) {
    String proposal = Objects.toString(comment, "").trim();
    String base = "Admin đã gửi đề xuất điều chỉnh phạm vi quyền cho request của bạn.";
    if (proposal.isEmpty()) {
      return base + " Ma request: " + request.getBusinessKey() + ". Vui long vao he thong de chap nhan hoac tu choi de xuat.";
    }
    return base + " Ma request: " + request.getBusinessKey() + ". Noi dung de xuat: "
        + proposal + ". Vui long vao he thong de chap nhan hoac tu choi.";
  }
}
