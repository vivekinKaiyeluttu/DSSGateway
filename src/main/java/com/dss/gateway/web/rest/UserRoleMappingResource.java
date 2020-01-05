package com.dss.gateway.web.rest;

import com.dss.gateway.domain.UserRoleMapping;
import com.dss.gateway.repository.UserRoleMappingRepository;
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
 * REST controller for managing {@link com.dss.gateway.domain.UserRoleMapping}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserRoleMappingResource {

    private final Logger log = LoggerFactory.getLogger(UserRoleMappingResource.class);

    private static final String ENTITY_NAME = "userRoleMapping";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRoleMappingRepository userRoleMappingRepository;

    public UserRoleMappingResource(UserRoleMappingRepository userRoleMappingRepository) {
        this.userRoleMappingRepository = userRoleMappingRepository;
    }

    /**
     * {@code POST  /user-role-mappings} : Create a new userRoleMapping.
     *
     * @param userRoleMapping the userRoleMapping to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userRoleMapping, or with status {@code 400 (Bad Request)} if the userRoleMapping has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-role-mappings")
    public ResponseEntity<UserRoleMapping> createUserRoleMapping(@RequestBody UserRoleMapping userRoleMapping) throws URISyntaxException {
        log.debug("REST request to save UserRoleMapping : {}", userRoleMapping);
        if (userRoleMapping.getId() != null) {
            throw new BadRequestAlertException("A new userRoleMapping cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserRoleMapping result = userRoleMappingRepository.save(userRoleMapping);
        return ResponseEntity.created(new URI("/api/user-role-mappings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-role-mappings} : Updates an existing userRoleMapping.
     *
     * @param userRoleMapping the userRoleMapping to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userRoleMapping,
     * or with status {@code 400 (Bad Request)} if the userRoleMapping is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userRoleMapping couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-role-mappings")
    public ResponseEntity<UserRoleMapping> updateUserRoleMapping(@RequestBody UserRoleMapping userRoleMapping) throws URISyntaxException {
        log.debug("REST request to update UserRoleMapping : {}", userRoleMapping);
        if (userRoleMapping.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserRoleMapping result = userRoleMappingRepository.save(userRoleMapping);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userRoleMapping.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-role-mappings} : get all the userRoleMappings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userRoleMappings in body.
     */
    @GetMapping("/user-role-mappings")
    public List<UserRoleMapping> getAllUserRoleMappings() {
        log.debug("REST request to get all UserRoleMappings");
        return userRoleMappingRepository.findAll();
    }

    /**
     * {@code GET  /user-role-mappings/:id} : get the "id" userRoleMapping.
     *
     * @param id the id of the userRoleMapping to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userRoleMapping, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-role-mappings/{id}")
    public ResponseEntity<UserRoleMapping> getUserRoleMapping(@PathVariable Long id) {
        log.debug("REST request to get UserRoleMapping : {}", id);
        Optional<UserRoleMapping> userRoleMapping = userRoleMappingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userRoleMapping);
    }

    /**
     * {@code DELETE  /user-role-mappings/:id} : delete the "id" userRoleMapping.
     *
     * @param id the id of the userRoleMapping to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-role-mappings/{id}")
    public ResponseEntity<Void> deleteUserRoleMapping(@PathVariable Long id) {
        log.debug("REST request to delete UserRoleMapping : {}", id);
        userRoleMappingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
