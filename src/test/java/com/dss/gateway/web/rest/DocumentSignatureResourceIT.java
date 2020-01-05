package com.dss.gateway.web.rest;

import com.dss.gateway.DssGatewayApp;
import com.dss.gateway.domain.DocumentSignature;
import com.dss.gateway.repository.DocumentSignatureRepository;
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

/**
 * Integration tests for the {@link DocumentSignatureResource} REST controller.
 */
@SpringBootTest(classes = DssGatewayApp.class)
public class DocumentSignatureResourceIT {

    private static final LocalDate DEFAULT_VALID_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_VALID_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_TO = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_DEVICE_ID = 1L;
    private static final Long UPDATED_DEVICE_ID = 2L;

    private static final String DEFAULT_SIGNATURE = "AAAAAAAAAA";
    private static final String UPDATED_SIGNATURE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private DocumentSignatureRepository documentSignatureRepository;

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

    private MockMvc restDocumentSignatureMockMvc;

    private DocumentSignature documentSignature;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentSignatureResource documentSignatureResource = new DocumentSignatureResource(documentSignatureRepository);
        this.restDocumentSignatureMockMvc = MockMvcBuilders.standaloneSetup(documentSignatureResource)
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
    public static DocumentSignature createEntity(EntityManager em) {
        DocumentSignature documentSignature = new DocumentSignature()
            .validFrom(DEFAULT_VALID_FROM)
            .validTo(DEFAULT_VALID_TO)
            .deviceId(DEFAULT_DEVICE_ID)
            .signature(DEFAULT_SIGNATURE)
            .createdAt(DEFAULT_CREATED_AT);
        return documentSignature;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentSignature createUpdatedEntity(EntityManager em) {
        DocumentSignature documentSignature = new DocumentSignature()
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .deviceId(UPDATED_DEVICE_ID)
            .signature(UPDATED_SIGNATURE)
            .createdAt(UPDATED_CREATED_AT);
        return documentSignature;
    }

    @BeforeEach
    public void initTest() {
        documentSignature = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentSignature() throws Exception {
        int databaseSizeBeforeCreate = documentSignatureRepository.findAll().size();

        // Create the DocumentSignature
        restDocumentSignatureMockMvc.perform(post("/api/document-signatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentSignature)))
            .andExpect(status().isCreated());

        // Validate the DocumentSignature in the database
        List<DocumentSignature> documentSignatureList = documentSignatureRepository.findAll();
        assertThat(documentSignatureList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentSignature testDocumentSignature = documentSignatureList.get(documentSignatureList.size() - 1);
        assertThat(testDocumentSignature.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testDocumentSignature.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
        assertThat(testDocumentSignature.getDeviceId()).isEqualTo(DEFAULT_DEVICE_ID);
        assertThat(testDocumentSignature.getSignature()).isEqualTo(DEFAULT_SIGNATURE);
        assertThat(testDocumentSignature.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
    }

    @Test
    @Transactional
    public void createDocumentSignatureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentSignatureRepository.findAll().size();

        // Create the DocumentSignature with an existing ID
        documentSignature.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentSignatureMockMvc.perform(post("/api/document-signatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentSignature)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentSignature in the database
        List<DocumentSignature> documentSignatureList = documentSignatureRepository.findAll();
        assertThat(documentSignatureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDocumentSignatures() throws Exception {
        // Initialize the database
        documentSignatureRepository.saveAndFlush(documentSignature);

        // Get all the documentSignatureList
        restDocumentSignatureMockMvc.perform(get("/api/document-signatures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentSignature.getId().intValue())))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM.toString())))
            .andExpect(jsonPath("$.[*].validTo").value(hasItem(DEFAULT_VALID_TO.toString())))
            .andExpect(jsonPath("$.[*].deviceId").value(hasItem(DEFAULT_DEVICE_ID.intValue())))
            .andExpect(jsonPath("$.[*].signature").value(hasItem(DEFAULT_SIGNATURE)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getDocumentSignature() throws Exception {
        // Initialize the database
        documentSignatureRepository.saveAndFlush(documentSignature);

        // Get the documentSignature
        restDocumentSignatureMockMvc.perform(get("/api/document-signatures/{id}", documentSignature.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentSignature.getId().intValue()))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM.toString()))
            .andExpect(jsonPath("$.validTo").value(DEFAULT_VALID_TO.toString()))
            .andExpect(jsonPath("$.deviceId").value(DEFAULT_DEVICE_ID.intValue()))
            .andExpect(jsonPath("$.signature").value(DEFAULT_SIGNATURE))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentSignature() throws Exception {
        // Get the documentSignature
        restDocumentSignatureMockMvc.perform(get("/api/document-signatures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentSignature() throws Exception {
        // Initialize the database
        documentSignatureRepository.saveAndFlush(documentSignature);

        int databaseSizeBeforeUpdate = documentSignatureRepository.findAll().size();

        // Update the documentSignature
        DocumentSignature updatedDocumentSignature = documentSignatureRepository.findById(documentSignature.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentSignature are not directly saved in db
        em.detach(updatedDocumentSignature);
        updatedDocumentSignature
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .deviceId(UPDATED_DEVICE_ID)
            .signature(UPDATED_SIGNATURE)
            .createdAt(UPDATED_CREATED_AT);

        restDocumentSignatureMockMvc.perform(put("/api/document-signatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentSignature)))
            .andExpect(status().isOk());

        // Validate the DocumentSignature in the database
        List<DocumentSignature> documentSignatureList = documentSignatureRepository.findAll();
        assertThat(documentSignatureList).hasSize(databaseSizeBeforeUpdate);
        DocumentSignature testDocumentSignature = documentSignatureList.get(documentSignatureList.size() - 1);
        assertThat(testDocumentSignature.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testDocumentSignature.getValidTo()).isEqualTo(UPDATED_VALID_TO);
        assertThat(testDocumentSignature.getDeviceId()).isEqualTo(UPDATED_DEVICE_ID);
        assertThat(testDocumentSignature.getSignature()).isEqualTo(UPDATED_SIGNATURE);
        assertThat(testDocumentSignature.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentSignature() throws Exception {
        int databaseSizeBeforeUpdate = documentSignatureRepository.findAll().size();

        // Create the DocumentSignature

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentSignatureMockMvc.perform(put("/api/document-signatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentSignature)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentSignature in the database
        List<DocumentSignature> documentSignatureList = documentSignatureRepository.findAll();
        assertThat(documentSignatureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentSignature() throws Exception {
        // Initialize the database
        documentSignatureRepository.saveAndFlush(documentSignature);

        int databaseSizeBeforeDelete = documentSignatureRepository.findAll().size();

        // Delete the documentSignature
        restDocumentSignatureMockMvc.perform(delete("/api/document-signatures/{id}", documentSignature.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DocumentSignature> documentSignatureList = documentSignatureRepository.findAll();
        assertThat(documentSignatureList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
