package com.dss.gateway.web.rest;

import com.dss.gateway.domain.DocumentSignature;
import com.dss.gateway.repository.DocumentSignatureRepository;
import com.dss.gateway.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.dss.gateway.domain.DocumentSignature}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocumentSignatureResource {

    private final Logger log = LoggerFactory.getLogger(DocumentSignatureResource.class);

    private static final String ENTITY_NAME = "documentSignature";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentSignatureRepository documentSignatureRepository;

    public DocumentSignatureResource(DocumentSignatureRepository documentSignatureRepository) {
        this.documentSignatureRepository = documentSignatureRepository;
    }

    /**
     * {@code POST  /document-signatures} : Create a new documentSignature.
     *
     * @param documentSignature the documentSignature to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentSignature, or with status {@code 400 (Bad Request)} if the documentSignature has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/document-signatures")
    public ResponseEntity<DocumentSignature> createDocumentSignature(@RequestBody DocumentSignature documentSignature) throws URISyntaxException {
        log.debug("REST request to save DocumentSignature : {}", documentSignature);
        if (documentSignature.getId() != null) {
            throw new BadRequestAlertException("A new documentSignature cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentSignature result = documentSignatureRepository.save(documentSignature);
        return ResponseEntity.created(new URI("/api/document-signatures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /document-signatures} : Updates an existing documentSignature.
     *
     * @param documentSignature the documentSignature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentSignature,
     * or with status {@code 400 (Bad Request)} if the documentSignature is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentSignature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/document-signatures")
    public ResponseEntity<DocumentSignature> updateDocumentSignature(@RequestBody DocumentSignature documentSignature) throws URISyntaxException {
        log.debug("REST request to update DocumentSignature : {}", documentSignature);
        if (documentSignature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentSignature result = documentSignatureRepository.save(documentSignature);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, documentSignature.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /document-signatures} : get all the documentSignatures.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentSignatures in body.
     */
    @GetMapping("/document-signatures")
    public List<DocumentSignature> getAllDocumentSignatures() {
        log.debug("REST request to get all DocumentSignatures");
        return documentSignatureRepository.findAll();
    }

    /**
     * {@code GET  /document-signatures/:id} : get the "id" documentSignature.
     *
     * @param id the id of the documentSignature to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentSignature, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/document-signatures/{id}")
    public ResponseEntity<DocumentSignature> getDocumentSignature(@PathVariable Long id) {
        log.debug("REST request to get DocumentSignature : {}", id);
        Optional<DocumentSignature> documentSignature = documentSignatureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentSignature);
    }

    /**
     * {@code DELETE  /document-signatures/:id} : delete the "id" documentSignature.
     *
     * @param id the id of the documentSignature to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/document-signatures/{id}")
    public ResponseEntity<Void> deleteDocumentSignature(@PathVariable Long id) {
        log.debug("REST request to delete DocumentSignature : {}", id);
        documentSignatureRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
