package com.dss.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * Document is the hero of this application.\nThis entity will hold information about the document.\nit's expected to add more fields to this entity. When the document is\nchanged/updated a new entry has to be added.
 */
@ApiModel(description = "Document is the hero of this application.\nThis entity will hold information about the document.\nit's expected to add more fields to this entity. When the document is\nchanged/updated a new entry has to be added.")
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Name of the file
     */
    @ApiModelProperty(value = "Name of the file")
    @Column(name = "file_name")
    private String fileName;

    /**
     * file digest to identify the file
     */
    @ApiModelProperty(value = "file digest to identify the file")
    @Column(name = "message_digest")
    private String messageDigest;

    /**
     * actual file, will be deprecated after first cut
     */
    @ApiModelProperty(value = "actual file, will be deprecated after first cut")
    @Lob
    @Column(name = "file")
    private byte[] file;

    @Column(name = "file_content_type")
    private String fileContentType;

    /**
     * date after which it can not be signed by anyone
     */
    @ApiModelProperty(value = "date after which it can not be signed by anyone")
    @Column(name = "expire_at")
    private LocalDate expireAt;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @OneToMany(mappedBy = "document")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DocumentSignature> documentSignatures = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private WorkFlow workFlow;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public Document fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getMessageDigest() {
        return messageDigest;
    }

    public Document messageDigest(String messageDigest) {
        this.messageDigest = messageDigest;
        return this;
    }

    public void setMessageDigest(String messageDigest) {
        this.messageDigest = messageDigest;
    }

    public byte[] getFile() {
        return file;
    }

    public Document file(byte[] file) {
        this.file = file;
        return this;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public Document fileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
        return this;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public LocalDate getExpireAt() {
        return expireAt;
    }

    public Document expireAt(LocalDate expireAt) {
        this.expireAt = expireAt;
        return this;
    }

    public void setExpireAt(LocalDate expireAt) {
        this.expireAt = expireAt;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public Document createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Set<DocumentSignature> getDocumentSignatures() {
        return documentSignatures;
    }

    public Document documentSignatures(Set<DocumentSignature> documentSignatures) {
        this.documentSignatures = documentSignatures;
        return this;
    }

    public Document addDocumentSignature(DocumentSignature documentSignature) {
        this.documentSignatures.add(documentSignature);
        documentSignature.setDocument(this);
        return this;
    }

    public Document removeDocumentSignature(DocumentSignature documentSignature) {
        this.documentSignatures.remove(documentSignature);
        documentSignature.setDocument(null);
        return this;
    }

    public void setDocumentSignatures(Set<DocumentSignature> documentSignatures) {
        this.documentSignatures = documentSignatures;
    }

    public WorkFlow getWorkFlow() {
        return workFlow;
    }

    public Document workFlow(WorkFlow workFlow) {
        this.workFlow = workFlow;
        return this;
    }

    public void setWorkFlow(WorkFlow workFlow) {
        this.workFlow = workFlow;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", fileName='" + getFileName() + "'" +
            ", messageDigest='" + getMessageDigest() + "'" +
            ", file='" + getFile() + "'" +
            ", fileContentType='" + getFileContentType() + "'" +
            ", expireAt='" + getExpireAt() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
