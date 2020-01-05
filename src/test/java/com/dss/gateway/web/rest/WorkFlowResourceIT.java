package com.dss.gateway.web.rest;

import com.dss.gateway.DssGatewayApp;
import com.dss.gateway.domain.WorkFlow;
import com.dss.gateway.repository.WorkFlowRepository;
import com.dss.gateway.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.dss.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.dss.gateway.domain.enumeration.Status;
/**
 * Integration tests for the {@link WorkFlowResource} REST controller.
 */
@SpringBootTest(classes = DssGatewayApp.class)
public class WorkFlowResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Status DEFAULT_STATUS = Status.INITIATED;
    private static final Status UPDATED_STATUS = Status.EXPIRED;

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private WorkFlowRepository workFlowRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restWorkFlowMockMvc;

    private WorkFlow workFlow;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkFlowResource workFlowResource = new WorkFlowResource(workFlowRepository);
        this.restWorkFlowMockMvc = MockMvcBuilders.standaloneSetup(workFlowResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkFlow createEntity(EntityManager em) {
        WorkFlow workFlow = new WorkFlow()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return workFlow;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkFlow createUpdatedEntity(EntityManager em) {
        WorkFlow workFlow = new WorkFlow()
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return workFlow;
    }

    @BeforeEach
    public void initTest() {
        workFlow = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkFlow() throws Exception {
        int databaseSizeBeforeCreate = workFlowRepository.findAll().size();

        // Create the WorkFlow
        restWorkFlowMockMvc.perform(post("/api/work-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workFlow)))
            .andExpect(status().isCreated());

        // Validate the WorkFlow in the database
        List<WorkFlow> workFlowList = workFlowRepository.findAll();
        assertThat(workFlowList).hasSize(databaseSizeBeforeCreate + 1);
        WorkFlow testWorkFlow = workFlowList.get(workFlowList.size() - 1);
        assertThat(testWorkFlow.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWorkFlow.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testWorkFlow.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testWorkFlow.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createWorkFlowWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workFlowRepository.findAll().size();

        // Create the WorkFlow with an existing ID
        workFlow.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkFlowMockMvc.perform(post("/api/work-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workFlow)))
            .andExpect(status().isBadRequest());

        // Validate the WorkFlow in the database
        List<WorkFlow> workFlowList = workFlowRepository.findAll();
        assertThat(workFlowList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWorkFlows() throws Exception {
        // Initialize the database
        workFlowRepository.saveAndFlush(workFlow);

        // Get all the workFlowList
        restWorkFlowMockMvc.perform(get("/api/work-flows?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workFlow.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getWorkFlow() throws Exception {
        // Initialize the database
        workFlowRepository.saveAndFlush(workFlow);

        // Get the workFlow
        restWorkFlowMockMvc.perform(get("/api/work-flows/{id}", workFlow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workFlow.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkFlow() throws Exception {
        // Get the workFlow
        restWorkFlowMockMvc.perform(get("/api/work-flows/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkFlow() throws Exception {
        // Initialize the database
        workFlowRepository.saveAndFlush(workFlow);

        int databaseSizeBeforeUpdate = workFlowRepository.findAll().size();

        // Update the workFlow
        WorkFlow updatedWorkFlow = workFlowRepository.findById(workFlow.getId()).get();
        // Disconnect from session so that the updates on updatedWorkFlow are not directly saved in db
        em.detach(updatedWorkFlow);
        updatedWorkFlow
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restWorkFlowMockMvc.perform(put("/api/work-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkFlow)))
            .andExpect(status().isOk());

        // Validate the WorkFlow in the database
        List<WorkFlow> workFlowList = workFlowRepository.findAll();
        assertThat(workFlowList).hasSize(databaseSizeBeforeUpdate);
        WorkFlow testWorkFlow = workFlowList.get(workFlowList.size() - 1);
        assertThat(testWorkFlow.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWorkFlow.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testWorkFlow.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testWorkFlow.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkFlow() throws Exception {
        int databaseSizeBeforeUpdate = workFlowRepository.findAll().size();

        // Create the WorkFlow

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkFlowMockMvc.perform(put("/api/work-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workFlow)))
            .andExpect(status().isBadRequest());

        // Validate the WorkFlow in the database
        List<WorkFlow> workFlowList = workFlowRepository.findAll();
        assertThat(workFlowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWorkFlow() throws Exception {
        // Initialize the database
        workFlowRepository.saveAndFlush(workFlow);

        int databaseSizeBeforeDelete = workFlowRepository.findAll().size();

        // Delete the workFlow
        restWorkFlowMockMvc.perform(delete("/api/work-flows/{id}", workFlow.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WorkFlow> workFlowList = workFlowRepository.findAll();
        assertThat(workFlowList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
