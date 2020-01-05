package com.dss.gateway.repository;

import com.dss.gateway.domain.WorkFlow;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WorkFlow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkFlowRepository extends JpaRepository<WorkFlow, Long> {

}
