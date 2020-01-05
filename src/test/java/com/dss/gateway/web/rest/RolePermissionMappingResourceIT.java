package com.dss.gateway.web.rest;

import com.dss.gateway.DssGatewayApp;
import com.dss.gateway.domain.RolePermissionMapping;
import com.dss.gateway.repository.RolePermissionMappingRepository;
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
 * Integration tests for the {@link RolePermissionMappingResource} REST controller.
 */
@SpringBootTest(classes = DssGatewayApp.class)
public class RolePermissionMappingResourceIT {

    @Autowired
    private RolePermissionMappingRepository rolePermissionMappingRepository;

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

    private MockMvc restRolePermissionMappingMockMvc;

    private RolePermissionMapping rolePermissionMapping;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RolePermissionMappingResource rolePermissionMappingResource = new RolePermissionMappingResource(rolePermissionMappingRepository);
        this.restRolePermissionMappingMockMvc = MockMvcBuilders.standaloneSetup(rolePermissionMappingResource)
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
    public static RolePermissionMapping createEntity(EntityManager em) {
        RolePermissionMapping rolePermissionMapping = new RolePermissionMapping();
        return rolePermissionMapping;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolePermissionMapping createUpdatedEntity(EntityManager em) {
        RolePermissionMapping rolePermissionMapping = new RolePermissionMapping();
        return rolePermissionMapping;
    }

    @BeforeEach
    public void initTest() {
        rolePermissionMapping = createEntity(em);
    }

    @Test
    @Transactional
    public void createRolePermissionMapping() throws Exception {
        int databaseSizeBeforeCreate = rolePermissionMappingRepository.findAll().size();

        // Create the RolePermissionMapping
        restRolePermissionMappingMockMvc.perform(post("/api/role-permission-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolePermissionMapping)))
            .andExpect(status().isCreated());

        // Validate the RolePermissionMapping in the database
        List<RolePermissionMapping> rolePermissionMappingList = rolePermissionMappingRepository.findAll();
        assertThat(rolePermissionMappingList).hasSize(databaseSizeBeforeCreate + 1);
        RolePermissionMapping testRolePermissionMapping = rolePermissionMappingList.get(rolePermissionMappingList.size() - 1);
    }

    @Test
    @Transactional
    public void createRolePermissionMappingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolePermissionMappingRepository.findAll().size();

        // Create the RolePermissionMapping with an existing ID
        rolePermissionMapping.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolePermissionMappingMockMvc.perform(post("/api/role-permission-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolePermissionMapping)))
            .andExpect(status().isBadRequest());

        // Validate the RolePermissionMapping in the database
        List<RolePermissionMapping> rolePermissionMappingList = rolePermissionMappingRepository.findAll();
        assertThat(rolePermissionMappingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRolePermissionMappings() throws Exception {
        // Initialize the database
        rolePermissionMappingRepository.saveAndFlush(rolePermissionMapping);

        // Get all the rolePermissionMappingList
        restRolePermissionMappingMockMvc.perform(get("/api/role-permission-mappings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rolePermissionMapping.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getRolePermissionMapping() throws Exception {
        // Initialize the database
        rolePermissionMappingRepository.saveAndFlush(rolePermissionMapping);

        // Get the rolePermissionMapping
        restRolePermissionMappingMockMvc.perform(get("/api/role-permission-mappings/{id}", rolePermissionMapping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rolePermissionMapping.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRolePermissionMapping() throws Exception {
        // Get the rolePermissionMapping
        restRolePermissionMappingMockMvc.perform(get("/api/role-permission-mappings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRolePermissionMapping() throws Exception {
        // Initialize the database
        rolePermissionMappingRepository.saveAndFlush(rolePermissionMapping);

        int databaseSizeBeforeUpdate = rolePermissionMappingRepository.findAll().size();

        // Update the rolePermissionMapping
        RolePermissionMapping updatedRolePermissionMapping = rolePermissionMappingRepository.findById(rolePermissionMapping.getId()).get();
        // Disconnect from session so that the updates on updatedRolePermissionMapping are not directly saved in db
        em.detach(updatedRolePermissionMapping);

        restRolePermissionMappingMockMvc.perform(put("/api/role-permission-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRolePermissionMapping)))
            .andExpect(status().isOk());

        // Validate the RolePermissionMapping in the database
        List<RolePermissionMapping> rolePermissionMappingList = rolePermissionMappingRepository.findAll();
        assertThat(rolePermissionMappingList).hasSize(databaseSizeBeforeUpdate);
        RolePermissionMapping testRolePermissionMapping = rolePermissionMappingList.get(rolePermissionMappingList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRolePermissionMapping() throws Exception {
        int databaseSizeBeforeUpdate = rolePermissionMappingRepository.findAll().size();

        // Create the RolePermissionMapping

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolePermissionMappingMockMvc.perform(put("/api/role-permission-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolePermissionMapping)))
            .andExpect(status().isBadRequest());

        // Validate the RolePermissionMapping in the database
        List<RolePermissionMapping> rolePermissionMappingList = rolePermissionMappingRepository.findAll();
        assertThat(rolePermissionMappingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRolePermissionMapping() throws Exception {
        // Initialize the database
        rolePermissionMappingRepository.saveAndFlush(rolePermissionMapping);

        int databaseSizeBeforeDelete = rolePermissionMappingRepository.findAll().size();

        // Delete the rolePermissionMapping
        restRolePermissionMappingMockMvc.perform(delete("/api/role-permission-mappings/{id}", rolePermissionMapping.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RolePermissionMapping> rolePermissionMappingList = rolePermissionMappingRepository.findAll();
        assertThat(rolePermissionMappingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
