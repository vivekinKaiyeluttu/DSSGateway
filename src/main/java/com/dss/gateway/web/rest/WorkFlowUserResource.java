package com.dss.gateway.web.rest;

import com.dss.gateway.domain.WorkFlowUser;
import com.dss.gateway.repository.WorkFlowUserRepository;
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
 * REST controller for managing {@link com.dss.gateway.domain.WorkFlowUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WorkFlowUserResource {

    private final Logger log = LoggerFactory.getLogger(WorkFlowUserResource.class);

    private static final String ENTITY_NAME = "workFlowUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkFlowUserRepository workFlowUserRepository;

    public WorkFlowUserResource(WorkFlowUserRepository workFlowUserRepository) {
        this.workFlowUserRepository = workFlowUserRepository;
    }

    /**
     * {@code POST  /work-flow-users} : Create a new workFlowUser.
     *
     * @param workFlowUser the workFlowUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workFlowUser, or with status {@code 400 (Bad Request)} if the workFlowUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/work-flow-users")
    public ResponseEntity<WorkFlowUser> createWorkFlowUser(@RequestBody WorkFlowUser workFlowUser) throws URISyntaxException {
        log.debug("REST request to save WorkFlowUser : {}", workFlowUser);
        if (workFlowUser.getId() != null) {
            throw new BadRequestAlertException("A new workFlowUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkFlowUser result = workFlowUserRepository.save(workFlowUser);
        return ResponseEntity.created(new URI("/api/work-flow-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /work-flow-users} : Updates an existing workFlowUser.
     *
     * @param workFlowUser the workFlowUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workFlowUser,
     * or with status {@code 400 (Bad Request)} if the workFlowUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workFlowUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/work-flow-users")
    public ResponseEntity<WorkFlowUser> updateWorkFlowUser(@RequestBody WorkFlowUser workFlowUser) throws URISyntaxException {
        log.debug("REST request to update WorkFlowUser : {}", workFlowUser);
        if (workFlowUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WorkFlowUser result = workFlowUserRepository.save(workFlowUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, workFlowUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /work-flow-users} : get all the workFlowUsers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of workFlowUsers in body.
     */
    @GetMapping("/work-flow-users")
    public List<WorkFlowUser> getAllWorkFlowUsers() {
        log.debug("REST request to get all WorkFlowUsers");
        return workFlowUserRepository.findAll();
    }

    /**
     * {@code GET  /work-flow-users/:id} : get the "id" workFlowUser.
     *
     * @param id the id of the workFlowUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workFlowUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/work-flow-users/{id}")
    public ResponseEntity<WorkFlowUser> getWorkFlowUser(@PathVariable Long id) {
        log.debug("REST request to get WorkFlowUser : {}", id);
        Optional<WorkFlowUser> workFlowUser = workFlowUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(workFlowUser);
    }

    /**
     * {@code DELETE  /work-flow-users/:id} : delete the "id" workFlowUser.
     *
     * @param id the id of the workFlowUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/work-flow-users/{id}")
    public ResponseEntity<Void> deleteWorkFlowUser(@PathVariable Long id) {
        log.debug("REST request to delete WorkFlowUser : {}", id);
        workFlowUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
