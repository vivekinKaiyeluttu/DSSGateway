package com.dss.gateway.repository;

import com.dss.gateway.domain.DocumentSignature;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocumentSignature entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentSignatureRepository extends JpaRepository<DocumentSignature, Long> {

}
