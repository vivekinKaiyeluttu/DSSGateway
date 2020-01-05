package com.dss.gateway.web.rest;

import com.dss.gateway.domain.WorkFlow;
import com.dss.gateway.repository.WorkFlowRepository;
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
 * REST controller for managing {@link com.dss.gateway.domain.WorkFlow}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WorkFlowResource {

    private final Logger log = LoggerFactory.getLogger(WorkFlowResource.class);

    private static final String ENTITY_NAME = "workFlow";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkFlowRepository workFlowRepository;

    public WorkFlowResource(WorkFlowRepository workFlowRepository) {
        this.workFlowRepository = workFlowRepository;
    }

    /**
     * {@code POST  /work-flows} : Create a new workFlow.
     *
     * @param workFlow the workFlow to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workFlow, or with status {@code 400 (Bad Request)} if the workFlow has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/work-flows")
    public ResponseEntity<WorkFlow> createWorkFlow(@RequestBody WorkFlow workFlow) throws URISyntaxException {
        log.debug("REST request to save WorkFlow : {}", workFlow);
        if (workFlow.getId() != null) {
            throw new BadRequestAlertException("A new workFlow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkFlow result = workFlowRepository.save(workFlow);
        return ResponseEntity.created(new URI("/api/work-flows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /work-flows} : Updates an existing workFlow.
     *
     * @param workFlow the workFlow to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workFlow,
     * or with status {@code 400 (Bad Request)} if the workFlow is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workFlow couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/work-flows")
    public ResponseEntity<WorkFlow> updateWorkFlow(@RequestBody WorkFlow workFlow) throws URISyntaxException {
        log.debug("REST request to update WorkFlow : {}", workFlow);
        if (workFlow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WorkFlow result = workFlowRepository.save(workFlow);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, workFlow.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /work-flows} : get all the workFlows.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of workFlows in body.
     */
    @GetMapping("/work-flows")
    public List<WorkFlow> getAllWorkFlows() {
        log.debug("REST request to get all WorkFlows");
        return workFlowRepository.findAll();
    }

    /**
     * {@code GET  /work-flows/:id} : get the "id" workFlow.
     *
     * @param id the id of the workFlow to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workFlow, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/work-flows/{id}")
    public ResponseEntity<WorkFlow> getWorkFlow(@PathVariable Long id) {
        log.debug("REST request to get WorkFlow : {}", id);
        Optional<WorkFlow> workFlow = workFlowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(workFlow);
    }

    /**
     * {@code DELETE  /work-flows/:id} : delete the "id" workFlow.
     *
     * @param id the id of the workFlow to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/work-flows/{id}")
    public ResponseEntity<Void> deleteWorkFlow(@PathVariable Long id) {
        log.debug("REST request to delete WorkFlow : {}", id);
        workFlowRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
