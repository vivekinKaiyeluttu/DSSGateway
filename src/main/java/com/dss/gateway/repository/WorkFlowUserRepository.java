package com.dss.gateway.repository;

import com.dss.gateway.domain.WorkFlowUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WorkFlowUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkFlowUserRepository extends JpaRepository<WorkFlowUser, Long> {

}
