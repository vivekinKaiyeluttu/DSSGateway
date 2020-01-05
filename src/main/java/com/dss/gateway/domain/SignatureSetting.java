package com.dss.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * SignatureSetting holds settings of a signature\nw.r.t to particular user. An user can have multiple\nsignatures based on the document he can choose which signature\nneeds to be inserted in a workflow.
 */
@ApiModel(description = "SignatureSetting holds settings of a signature\nw.r.t to particular user. An user can have multiple\nsignatures based on the document he can choose which signature\nneeds to be inserted in a workflow.")
@Entity
@Table(name = "signature_setting")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SignatureSetting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * name of the signature setting for identification
     */
    @NotNull
    @ApiModelProperty(value = "name of the signature setting for identification", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * signAs text that needs to displayed in signature
     */
    @NotNull
    @ApiModelProperty(value = "signAs text that needs to displayed in signature", required = true)
    @Column(name = "sign_as", nullable = false)
    private String signAs;

    /**
     * User designation it's optional
     */
    @ApiModelProperty(value = "User designation it's optional")
    @Column(name = "designation")
    private String designation;

    /**
     * signature image that needs to appear in signature
     */
    @ApiModelProperty(value = "signature image that needs to appear in signature")
    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    /**
     * if it's set true by default this signatures will appear in\nthe document in which the user is signing.
     */
    @ApiModelProperty(value = "if it's set true by default this signatures will appear in\nthe document in which the user is signing.")
    @Column(name = "default_signature")
    private Boolean defaultSignature;

    /**
     * Address of the user that needs to displayed.
     */
    @ApiModelProperty(value = "Address of the user that needs to displayed.")
    @Column(name = "address")
    private String address;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @ManyToOne
    @JsonIgnoreProperties("signatureSettings")
    private Users users;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SignatureSetting name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSignAs() {
        return signAs;
    }

    public SignatureSetting signAs(String signAs) {
        this.signAs = signAs;
        return this;
    }

    public void setSignAs(String signAs) {
        this.signAs = signAs;
    }

    public String getDesignation() {
        return designation;
    }

    public SignatureSetting designation(String designation) {
        this.designation = designation;
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public byte[] getImage() {
        return image;
    }

    public SignatureSetting image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public SignatureSetting imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Boolean isDefaultSignature() {
        return defaultSignature;
    }

    public SignatureSetting defaultSignature(Boolean defaultSignature) {
        this.defaultSignature = defaultSignature;
        return this;
    }

    public void setDefaultSignature(Boolean defaultSignature) {
        this.defaultSignature = defaultSignature;
    }

    public String getAddress() {
        return address;
    }

    public SignatureSetting address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public SignatureSetting createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public SignatureSetting updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Users getUsers() {
        return users;
    }

    public SignatureSetting users(Users users) {
        this.users = users;
        return this;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SignatureSetting)) {
            return false;
        }
        return id != null && id.equals(((SignatureSetting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SignatureSetting{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", signAs='" + getSignAs() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", defaultSignature='" + isDefaultSignature() + "'" +
            ", address='" + getAddress() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
