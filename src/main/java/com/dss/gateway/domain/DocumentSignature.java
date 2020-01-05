package com.dss.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DocumentSignature is second hero of this application\nholds information about signature
 */
@ApiModel(description = "DocumentSignature is second hero of this application\nholds information about signature")
@Entity
@Table(name = "document_signature")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DocumentSignature implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Date from which the signature will be valid
     */
    @ApiModelProperty(value = "Date from which the signature will be valid")
    @Column(name = "valid_from")
    private LocalDate validFrom;

    /**
     * Date till which the signature will be valid
     */
    @ApiModelProperty(value = "Date till which the signature will be valid")
    @Column(name = "valid_to")
    private LocalDate validTo;

    /**
     * id of the device that's been used to sign by the user
     */
    @ApiModelProperty(value = "id of the device that's been used to sign by the user")
    @Column(name = "device_id")
    private Long deviceId;

    /**
     * FIDO2 signature
     */
    @ApiModelProperty(value = "FIDO2 signature")
    @Column(name = "signature")
    private String signature;

    /**
     * Date at which signature is created
     */
    @ApiModelProperty(value = "Date at which signature is created")
    @Column(name = "created_at")
    private LocalDate createdAt;

    @ManyToOne
    @JsonIgnoreProperties("documentSignatures")
    private Document document;

    @ManyToOne
    @JsonIgnoreProperties("documentSignatures")
    private WorkFlowUser workFlowUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public DocumentSignature validFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
        return this;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public DocumentSignature validTo(LocalDate validTo) {
        this.validTo = validTo;
        return this;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public DocumentSignature deviceId(Long deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getSignature() {
        return signature;
    }

    public DocumentSignature signature(String signature) {
        this.signature = signature;
        return this;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public DocumentSignature createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Document getDocument() {
        return document;
    }

    public DocumentSignature document(Document document) {
        this.document = document;
        return this;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public WorkFlowUser getWorkFlowUser() {
        return workFlowUser;
    }

    public DocumentSignature workFlowUser(WorkFlowUser workFlowUser) {
        this.workFlowUser = workFlowUser;
        return this;
    }

    public void setWorkFlowUser(WorkFlowUser workFlowUser) {
        this.workFlowUser = workFlowUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentSignature)) {
            return false;
        }
        return id != null && id.equals(((DocumentSignature) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DocumentSignature{" +
            "id=" + getId() +
            ", validFrom='" + getValidFrom() + "'" +
            ", validTo='" + getValidTo() + "'" +
            ", deviceId=" + getDeviceId() +
            ", signature='" + getSignature() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
