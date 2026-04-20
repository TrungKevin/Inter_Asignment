package org.example.camunda.repository;

import org.example.camunda.entity.AccessRequestLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccessRequestLineRepository extends JpaRepository<AccessRequestLine, Long> {
    List<AccessRequestLine> findByRequestIdOrderByLineIdAsc(Long requestId);
}
