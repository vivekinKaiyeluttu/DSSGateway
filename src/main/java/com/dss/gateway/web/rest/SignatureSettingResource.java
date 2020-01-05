package com.dss.gateway.web.rest;

import com.dss.gateway.domain.SignatureSetting;
import com.dss.gateway.repository.SignatureSettingRepository;
import com.dss.gateway.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.dss.gateway.domain.SignatureSetting}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SignatureSettingResource {

    private final Logger log = LoggerFactory.getLogger(SignatureSettingResource.class);

    private static final String ENTITY_NAME = "signatureSetting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SignatureSettingRepository signatureSettingRepository;

    public SignatureSettingResource(SignatureSettingRepository signatureSettingRepository) {
        this.signatureSettingRepository = signatureSettingRepository;
    }

    /**
     * {@code POST  /signature-settings} : Create a new signatureSetting.
     *
     * @param signatureSetting the signatureSetting to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new signatureSetting, or with status {@code 400 (Bad Request)} if the signatureSetting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/signature-settings")
    public ResponseEntity<SignatureSetting> createSignatureSetting(@Valid @RequestBody SignatureSetting signatureSetting) throws URISyntaxException {
        log.debug("REST request to save SignatureSetting : {}", signatureSetting);
        if (signatureSetting.getId() != null) {
            throw new BadRequestAlertException("A new signatureSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SignatureSetting result = signatureSettingRepository.save(signatureSetting);
        return ResponseEntity.created(new URI("/api/signature-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /signature-settings} : Updates an existing signatureSetting.
     *
     * @param signatureSetting the signatureSetting to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated signatureSetting,
     * or with status {@code 400 (Bad Request)} if the signatureSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the signatureSetting couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/signature-settings")
    public ResponseEntity<SignatureSetting> updateSignatureSetting(@Valid @RequestBody SignatureSetting signatureSetting) throws URISyntaxException {
        log.debug("REST request to update SignatureSetting : {}", signatureSetting);
        if (signatureSetting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SignatureSetting result = signatureSettingRepository.save(signatureSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, signatureSetting.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /signature-settings} : get all the signatureSettings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of signatureSettings in body.
     */
    @GetMapping("/signature-settings")
    public List<SignatureSetting> getAllSignatureSettings() {
        log.debug("REST request to get all SignatureSettings");
        return signatureSettingRepository.findAll();
    }

    /**
     * {@code GET  /signature-settings/:id} : get the "id" signatureSetting.
     *
     * @param id the id of the signatureSetting to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the signatureSetting, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/signature-settings/{id}")
    public ResponseEntity<SignatureSetting> getSignatureSetting(@PathVariable Long id) {
        log.debug("REST request to get SignatureSetting : {}", id);
        Optional<SignatureSetting> signatureSetting = signatureSettingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(signatureSetting);
    }

    /**
     * {@code DELETE  /signature-settings/:id} : delete the "id" signatureSetting.
     *
     * @param id the id of the signatureSetting to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/signature-settings/{id}")
    public ResponseEntity<Void> deleteSignatureSetting(@PathVariable Long id) {
        log.debug("REST request to delete SignatureSetting : {}", id);
        signatureSettingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
