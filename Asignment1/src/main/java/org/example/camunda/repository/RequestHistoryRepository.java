package org.example.camunda.repository;

import org.example.camunda.entity.RequestHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestHistoryRepository extends JpaRepository<RequestHistory, Long> {

  List<RequestHistory> findByRequestIdOrderByCreatedAtAsc(Long requestId);
}
