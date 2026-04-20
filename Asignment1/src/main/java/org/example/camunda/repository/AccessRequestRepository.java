package org.example.camunda.repository;

import org.example.camunda.entity.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AccessRequestRepository extends JpaRepository<AccessRequest, Long> {
    Optional<AccessRequest> findByBusinessKey(String businessKey);
    List<AccessRequest> findByRequesterUsernameOrderByCreatedAtDesc(String requesterUsername);
}