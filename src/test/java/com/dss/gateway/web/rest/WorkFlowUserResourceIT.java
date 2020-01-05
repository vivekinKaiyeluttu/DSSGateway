package com.dss.gateway.web.rest;

import com.dss.gateway.DssGatewayApp;
import com.dss.gateway.domain.WorkFlowUser;
import com.dss.gateway.repository.WorkFlowUserRepository;
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
import java.util.List;

import static com.dss.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link WorkFlowUserResource} REST controller.
 */
@SpringBootTest(classes = DssGatewayApp.class)
public class WorkFlowUserResourceIT {

    private static final Long DEFAULT_STEP = 1L;
    private static final Long UPDATED_STEP = 2L;

    @Autowired
    private WorkFlowUserRepository workFlowUserRepository;

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

    private MockMvc restWorkFlowUserMockMvc;

    private WorkFlowUser workFlowUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkFlowUserResource workFlowUserResource = new WorkFlowUserResource(workFlowUserRepository);
        this.restWorkFlowUserMockMvc = MockMvcBuilders.standaloneSetup(workFlowUserResource)
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
    public static WorkFlowUser createEntity(EntityManager em) {
        WorkFlowUser workFlowUser = new WorkFlowUser()
            .step(DEFAULT_STEP);
        return workFlowUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkFlowUser createUpdatedEntity(EntityManager em) {
        WorkFlowUser workFlowUser = new WorkFlowUser()
            .step(UPDATED_STEP);
        return workFlowUser;
    }

    @BeforeEach
    public void initTest() {
        workFlowUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkFlowUser() throws Exception {
        int databaseSizeBeforeCreate = workFlowUserRepository.findAll().size();

        // Create the WorkFlowUser
        restWorkFlowUserMockMvc.perform(post("/api/work-flow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workFlowUser)))
            .andExpect(status().isCreated());

        // Validate the WorkFlowUser in the database
        List<WorkFlowUser> workFlowUserList = workFlowUserRepository.findAll();
        assertThat(workFlowUserList).hasSize(databaseSizeBeforeCreate + 1);
        WorkFlowUser testWorkFlowUser = workFlowUserList.get(workFlowUserList.size() - 1);
        assertThat(testWorkFlowUser.getStep()).isEqualTo(DEFAULT_STEP);
    }

    @Test
    @Transactional
    public void createWorkFlowUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workFlowUserRepository.findAll().size();

        // Create the WorkFlowUser with an existing ID
        workFlowUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkFlowUserMockMvc.perform(post("/api/work-flow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workFlowUser)))
            .andExpect(status().isBadRequest());

        // Validate the WorkFlowUser in the database
        List<WorkFlowUser> workFlowUserList = workFlowUserRepository.findAll();
        assertThat(workFlowUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWorkFlowUsers() throws Exception {
        // Initialize the database
        workFlowUserRepository.saveAndFlush(workFlowUser);

        // Get all the workFlowUserList
        restWorkFlowUserMockMvc.perform(get("/api/work-flow-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workFlowUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].step").value(hasItem(DEFAULT_STEP.intValue())));
    }
    
    @Test
    @Transactional
    public void getWorkFlowUser() throws Exception {
        // Initialize the database
        workFlowUserRepository.saveAndFlush(workFlowUser);

        // Get the workFlowUser
        restWorkFlowUserMockMvc.perform(get("/api/work-flow-users/{id}", workFlowUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workFlowUser.getId().intValue()))
            .andExpect(jsonPath("$.step").value(DEFAULT_STEP.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkFlowUser() throws Exception {
        // Get the workFlowUser
        restWorkFlowUserMockMvc.perform(get("/api/work-flow-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkFlowUser() throws Exception {
        // Initialize the database
        workFlowUserRepository.saveAndFlush(workFlowUser);

        int databaseSizeBeforeUpdate = workFlowUserRepository.findAll().size();

        // Update the workFlowUser
        WorkFlowUser updatedWorkFlowUser = workFlowUserRepository.findById(workFlowUser.getId()).get();
        // Disconnect from session so that the updates on updatedWorkFlowUser are not directly saved in db
        em.detach(updatedWorkFlowUser);
        updatedWorkFlowUser
            .step(UPDATED_STEP);

        restWorkFlowUserMockMvc.perform(put("/api/work-flow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkFlowUser)))
            .andExpect(status().isOk());

        // Validate the WorkFlowUser in the database
        List<WorkFlowUser> workFlowUserList = workFlowUserRepository.findAll();
        assertThat(workFlowUserList).hasSize(databaseSizeBeforeUpdate);
        WorkFlowUser testWorkFlowUser = workFlowUserList.get(workFlowUserList.size() - 1);
        assertThat(testWorkFlowUser.getStep()).isEqualTo(UPDATED_STEP);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkFlowUser() throws Exception {
        int databaseSizeBeforeUpdate = workFlowUserRepository.findAll().size();

        // Create the WorkFlowUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkFlowUserMockMvc.perform(put("/api/work-flow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workFlowUser)))
            .andExpect(status().isBadRequest());

        // Validate the WorkFlowUser in the database
        List<WorkFlowUser> workFlowUserList = workFlowUserRepository.findAll();
        assertThat(workFlowUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWorkFlowUser() throws Exception {
        // Initialize the database
        workFlowUserRepository.saveAndFlush(workFlowUser);

        int databaseSizeBeforeDelete = workFlowUserRepository.findAll().size();

        // Delete the workFlowUser
        restWorkFlowUserMockMvc.perform(delete("/api/work-flow-users/{id}", workFlowUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WorkFlowUser> workFlowUserList = workFlowUserRepository.findAll();
        assertThat(workFlowUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
