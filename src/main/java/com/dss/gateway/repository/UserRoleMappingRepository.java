package com.dss.gateway.repository;

import com.dss.gateway.domain.UserRoleMapping;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserRoleMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRoleMappingRepository extends JpaRepository<UserRoleMapping, Long> {

}
