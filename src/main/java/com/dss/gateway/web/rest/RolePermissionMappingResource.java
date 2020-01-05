package com.dss.gateway.web.rest;

import com.dss.gateway.domain.RolePermissionMapping;
import com.dss.gateway.repository.RolePermissionMappingRepository;
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
 * REST controller for managing {@link com.dss.gateway.domain.RolePermissionMapping}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RolePermissionMappingResource {

    private final Logger log = LoggerFactory.getLogger(RolePermissionMappingResource.class);

    private static final String ENTITY_NAME = "rolePermissionMapping";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RolePermissionMappingRepository rolePermissionMappingRepository;

    public RolePermissionMappingResource(RolePermissionMappingRepository rolePermissionMappingRepository) {
        this.rolePermissionMappingRepository = rolePermissionMappingRepository;
    }

    /**
     * {@code POST  /role-permission-mappings} : Create a new rolePermissionMapping.
     *
     * @param rolePermissionMapping the rolePermissionMapping to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rolePermissionMapping, or with status {@code 400 (Bad Request)} if the rolePermissionMapping has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/role-permission-mappings")
    public ResponseEntity<RolePermissionMapping> createRolePermissionMapping(@RequestBody RolePermissionMapping rolePermissionMapping) throws URISyntaxException {
        log.debug("REST request to save RolePermissionMapping : {}", rolePermissionMapping);
        if (rolePermissionMapping.getId() != null) {
            throw new BadRequestAlertException("A new rolePermissionMapping cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RolePermissionMapping result = rolePermissionMappingRepository.save(rolePermissionMapping);
        return ResponseEntity.created(new URI("/api/role-permission-mappings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /role-permission-mappings} : Updates an existing rolePermissionMapping.
     *
     * @param rolePermissionMapping the rolePermissionMapping to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolePermissionMapping,
     * or with status {@code 400 (Bad Request)} if the rolePermissionMapping is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rolePermissionMapping couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/role-permission-mappings")
    public ResponseEntity<RolePermissionMapping> updateRolePermissionMapping(@RequestBody RolePermissionMapping rolePermissionMapping) throws URISyntaxException {
        log.debug("REST request to update RolePermissionMapping : {}", rolePermissionMapping);
        if (rolePermissionMapping.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RolePermissionMapping result = rolePermissionMappingRepository.save(rolePermissionMapping);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rolePermissionMapping.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /role-permission-mappings} : get all the rolePermissionMappings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rolePermissionMappings in body.
     */
    @GetMapping("/role-permission-mappings")
    public List<RolePermissionMapping> getAllRolePermissionMappings() {
        log.debug("REST request to get all RolePermissionMappings");
        return rolePermissionMappingRepository.findAll();
    }

    /**
     * {@code GET  /role-permission-mappings/:id} : get the "id" rolePermissionMapping.
     *
     * @param id the id of the rolePermissionMapping to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rolePermissionMapping, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/role-permission-mappings/{id}")
    public ResponseEntity<RolePermissionMapping> getRolePermissionMapping(@PathVariable Long id) {
        log.debug("REST request to get RolePermissionMapping : {}", id);
        Optional<RolePermissionMapping> rolePermissionMapping = rolePermissionMappingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rolePermissionMapping);
    }

    /**
     * {@code DELETE  /role-permission-mappings/:id} : delete the "id" rolePermissionMapping.
     *
     * @param id the id of the rolePermissionMapping to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/role-permission-mappings/{id}")
    public ResponseEntity<Void> deleteRolePermissionMapping(@PathVariable Long id) {
        log.debug("REST request to delete RolePermissionMapping : {}", id);
        rolePermissionMappingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
