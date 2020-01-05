package com.dss.gateway.web.rest;

import com.dss.gateway.DssGatewayApp;
import com.dss.gateway.domain.UserRoleMapping;
import com.dss.gateway.repository.UserRoleMappingRepository;
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
 * Integration tests for the {@link UserRoleMappingResource} REST controller.
 */
@SpringBootTest(classes = DssGatewayApp.class)
public class UserRoleMappingResourceIT {

    @Autowired
    private UserRoleMappingRepository userRoleMappingRepository;

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

    private MockMvc restUserRoleMappingMockMvc;

    private UserRoleMapping userRoleMapping;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserRoleMappingResource userRoleMappingResource = new UserRoleMappingResource(userRoleMappingRepository);
        this.restUserRoleMappingMockMvc = MockMvcBuilders.standaloneSetup(userRoleMappingResource)
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
    public static UserRoleMapping createEntity(EntityManager em) {
        UserRoleMapping userRoleMapping = new UserRoleMapping();
        return userRoleMapping;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserRoleMapping createUpdatedEntity(EntityManager em) {
        UserRoleMapping userRoleMapping = new UserRoleMapping();
        return userRoleMapping;
    }

    @BeforeEach
    public void initTest() {
        userRoleMapping = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserRoleMapping() throws Exception {
        int databaseSizeBeforeCreate = userRoleMappingRepository.findAll().size();

        // Create the UserRoleMapping
        restUserRoleMappingMockMvc.perform(post("/api/user-role-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRoleMapping)))
            .andExpect(status().isCreated());

        // Validate the UserRoleMapping in the database
        List<UserRoleMapping> userRoleMappingList = userRoleMappingRepository.findAll();
        assertThat(userRoleMappingList).hasSize(databaseSizeBeforeCreate + 1);
        UserRoleMapping testUserRoleMapping = userRoleMappingList.get(userRoleMappingList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserRoleMappingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userRoleMappingRepository.findAll().size();

        // Create the UserRoleMapping with an existing ID
        userRoleMapping.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserRoleMappingMockMvc.perform(post("/api/user-role-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRoleMapping)))
            .andExpect(status().isBadRequest());

        // Validate the UserRoleMapping in the database
        List<UserRoleMapping> userRoleMappingList = userRoleMappingRepository.findAll();
        assertThat(userRoleMappingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserRoleMappings() throws Exception {
        // Initialize the database
        userRoleMappingRepository.saveAndFlush(userRoleMapping);

        // Get all the userRoleMappingList
        restUserRoleMappingMockMvc.perform(get("/api/user-role-mappings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userRoleMapping.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUserRoleMapping() throws Exception {
        // Initialize the database
        userRoleMappingRepository.saveAndFlush(userRoleMapping);

        // Get the userRoleMapping
        restUserRoleMappingMockMvc.perform(get("/api/user-role-mappings/{id}", userRoleMapping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userRoleMapping.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserRoleMapping() throws Exception {
        // Get the userRoleMapping
        restUserRoleMappingMockMvc.perform(get("/api/user-role-mappings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserRoleMapping() throws Exception {
        // Initialize the database
        userRoleMappingRepository.saveAndFlush(userRoleMapping);

        int databaseSizeBeforeUpdate = userRoleMappingRepository.findAll().size();

        // Update the userRoleMapping
        UserRoleMapping updatedUserRoleMapping = userRoleMappingRepository.findById(userRoleMapping.getId()).get();
        // Disconnect from session so that the updates on updatedUserRoleMapping are not directly saved in db
        em.detach(updatedUserRoleMapping);

        restUserRoleMappingMockMvc.perform(put("/api/user-role-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserRoleMapping)))
            .andExpect(status().isOk());

        // Validate the UserRoleMapping in the database
        List<UserRoleMapping> userRoleMappingList = userRoleMappingRepository.findAll();
        assertThat(userRoleMappingList).hasSize(databaseSizeBeforeUpdate);
        UserRoleMapping testUserRoleMapping = userRoleMappingList.get(userRoleMappingList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserRoleMapping() throws Exception {
        int databaseSizeBeforeUpdate = userRoleMappingRepository.findAll().size();

        // Create the UserRoleMapping

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserRoleMappingMockMvc.perform(put("/api/user-role-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRoleMapping)))
            .andExpect(status().isBadRequest());

        // Validate the UserRoleMapping in the database
        List<UserRoleMapping> userRoleMappingList = userRoleMappingRepository.findAll();
        assertThat(userRoleMappingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserRoleMapping() throws Exception {
        // Initialize the database
        userRoleMappingRepository.saveAndFlush(userRoleMapping);

        int databaseSizeBeforeDelete = userRoleMappingRepository.findAll().size();

        // Delete the userRoleMapping
        restUserRoleMappingMockMvc.perform(delete("/api/user-role-mappings/{id}", userRoleMapping.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserRoleMapping> userRoleMappingList = userRoleMappingRepository.findAll();
        assertThat(userRoleMappingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
