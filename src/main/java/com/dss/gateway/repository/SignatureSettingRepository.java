package com.dss.gateway.repository;

import com.dss.gateway.domain.SignatureSetting;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SignatureSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SignatureSettingRepository extends JpaRepository<SignatureSetting, Long> {

}
