package com.dss.gateway.web.rest;

import com.dss.gateway.DssGatewayApp;
import com.dss.gateway.domain.SignatureSetting;
import com.dss.gateway.repository.SignatureSettingRepository;
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
import org.springframework.util.Base64Utils;
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
 * Integration tests for the {@link SignatureSettingResource} REST controller.
 */
@SpringBootTest(classes = DssGatewayApp.class)
public class SignatureSettingResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SIGN_AS = "AAAAAAAAAA";
    private static final String UPDATED_SIGN_AS = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_DEFAULT_SIGNATURE = false;
    private static final Boolean UPDATED_DEFAULT_SIGNATURE = true;

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SignatureSettingRepository signatureSettingRepository;

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

    private MockMvc restSignatureSettingMockMvc;

    private SignatureSetting signatureSetting;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SignatureSettingResource signatureSettingResource = new SignatureSettingResource(signatureSettingRepository);
        this.restSignatureSettingMockMvc = MockMvcBuilders.standaloneSetup(signatureSettingResource)
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
    public static SignatureSetting createEntity(EntityManager em) {
        SignatureSetting signatureSetting = new SignatureSetting()
            .name(DEFAULT_NAME)
            .signAs(DEFAULT_SIGN_AS)
            .designation(DEFAULT_DESIGNATION)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .defaultSignature(DEFAULT_DEFAULT_SIGNATURE)
            .address(DEFAULT_ADDRESS)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return signatureSetting;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SignatureSetting createUpdatedEntity(EntityManager em) {
        SignatureSetting signatureSetting = new SignatureSetting()
            .name(UPDATED_NAME)
            .signAs(UPDATED_SIGN_AS)
            .designation(UPDATED_DESIGNATION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .defaultSignature(UPDATED_DEFAULT_SIGNATURE)
            .address(UPDATED_ADDRESS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return signatureSetting;
    }

    @BeforeEach
    public void initTest() {
        signatureSetting = createEntity(em);
    }

    @Test
    @Transactional
    public void createSignatureSetting() throws Exception {
        int databaseSizeBeforeCreate = signatureSettingRepository.findAll().size();

        // Create the SignatureSetting
        restSignatureSettingMockMvc.perform(post("/api/signature-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureSetting)))
            .andExpect(status().isCreated());

        // Validate the SignatureSetting in the database
        List<SignatureSetting> signatureSettingList = signatureSettingRepository.findAll();
        assertThat(signatureSettingList).hasSize(databaseSizeBeforeCreate + 1);
        SignatureSetting testSignatureSetting = signatureSettingList.get(signatureSettingList.size() - 1);
        assertThat(testSignatureSetting.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSignatureSetting.getSignAs()).isEqualTo(DEFAULT_SIGN_AS);
        assertThat(testSignatureSetting.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testSignatureSetting.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testSignatureSetting.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testSignatureSetting.isDefaultSignature()).isEqualTo(DEFAULT_DEFAULT_SIGNATURE);
        assertThat(testSignatureSetting.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testSignatureSetting.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testSignatureSetting.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createSignatureSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = signatureSettingRepository.findAll().size();

        // Create the SignatureSetting with an existing ID
        signatureSetting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSignatureSettingMockMvc.perform(post("/api/signature-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureSetting)))
            .andExpect(status().isBadRequest());

        // Validate the SignatureSetting in the database
        List<SignatureSetting> signatureSettingList = signatureSettingRepository.findAll();
        assertThat(signatureSettingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = signatureSettingRepository.findAll().size();
        // set the field null
        signatureSetting.setName(null);

        // Create the SignatureSetting, which fails.

        restSignatureSettingMockMvc.perform(post("/api/signature-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureSetting)))
            .andExpect(status().isBadRequest());

        List<SignatureSetting> signatureSettingList = signatureSettingRepository.findAll();
        assertThat(signatureSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSignAsIsRequired() throws Exception {
        int databaseSizeBeforeTest = signatureSettingRepository.findAll().size();
        // set the field null
        signatureSetting.setSignAs(null);

        // Create the SignatureSetting, which fails.

        restSignatureSettingMockMvc.perform(post("/api/signature-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureSetting)))
            .andExpect(status().isBadRequest());

        List<SignatureSetting> signatureSettingList = signatureSettingRepository.findAll();
        assertThat(signatureSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSignatureSettings() throws Exception {
        // Initialize the database
        signatureSettingRepository.saveAndFlush(signatureSetting);

        // Get all the signatureSettingList
        restSignatureSettingMockMvc.perform(get("/api/signature-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(signatureSetting.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].signAs").value(hasItem(DEFAULT_SIGN_AS)))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].defaultSignature").value(hasItem(DEFAULT_DEFAULT_SIGNATURE.booleanValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getSignatureSetting() throws Exception {
        // Initialize the database
        signatureSettingRepository.saveAndFlush(signatureSetting);

        // Get the signatureSetting
        restSignatureSettingMockMvc.perform(get("/api/signature-settings/{id}", signatureSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(signatureSetting.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.signAs").value(DEFAULT_SIGN_AS))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.defaultSignature").value(DEFAULT_DEFAULT_SIGNATURE.booleanValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSignatureSetting() throws Exception {
        // Get the signatureSetting
        restSignatureSettingMockMvc.perform(get("/api/signature-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSignatureSetting() throws Exception {
        // Initialize the database
        signatureSettingRepository.saveAndFlush(signatureSetting);

        int databaseSizeBeforeUpdate = signatureSettingRepository.findAll().size();

        // Update the signatureSetting
        SignatureSetting updatedSignatureSetting = signatureSettingRepository.findById(signatureSetting.getId()).get();
        // Disconnect from session so that the updates on updatedSignatureSetting are not directly saved in db
        em.detach(updatedSignatureSetting);
        updatedSignatureSetting
            .name(UPDATED_NAME)
            .signAs(UPDATED_SIGN_AS)
            .designation(UPDATED_DESIGNATION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .defaultSignature(UPDATED_DEFAULT_SIGNATURE)
            .address(UPDATED_ADDRESS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restSignatureSettingMockMvc.perform(put("/api/signature-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSignatureSetting)))
            .andExpect(status().isOk());

        // Validate the SignatureSetting in the database
        List<SignatureSetting> signatureSettingList = signatureSettingRepository.findAll();
        assertThat(signatureSettingList).hasSize(databaseSizeBeforeUpdate);
        SignatureSetting testSignatureSetting = signatureSettingList.get(signatureSettingList.size() - 1);
        assertThat(testSignatureSetting.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSignatureSetting.getSignAs()).isEqualTo(UPDATED_SIGN_AS);
        assertThat(testSignatureSetting.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testSignatureSetting.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testSignatureSetting.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testSignatureSetting.isDefaultSignature()).isEqualTo(UPDATED_DEFAULT_SIGNATURE);
        assertThat(testSignatureSetting.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSignatureSetting.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testSignatureSetting.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingSignatureSetting() throws Exception {
        int databaseSizeBeforeUpdate = signatureSettingRepository.findAll().size();

        // Create the SignatureSetting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSignatureSettingMockMvc.perform(put("/api/signature-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureSetting)))
            .andExpect(status().isBadRequest());

        // Validate the SignatureSetting in the database
        List<SignatureSetting> signatureSettingList = signatureSettingRepository.findAll();
        assertThat(signatureSettingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSignatureSetting() throws Exception {
        // Initialize the database
        signatureSettingRepository.saveAndFlush(signatureSetting);

        int databaseSizeBeforeDelete = signatureSettingRepository.findAll().size();

        // Delete the signatureSetting
        restSignatureSettingMockMvc.perform(delete("/api/signature-settings/{id}", signatureSetting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SignatureSetting> signatureSettingList = signatureSettingRepository.findAll();
        assertThat(signatureSettingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
