package com.dss.gateway.repository;

import com.dss.gateway.domain.RolePermissionMapping;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RolePermissionMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolePermissionMappingRepository extends JpaRepository<RolePermissionMapping, Long> {

}
