package com.dss.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * WorkFlowUser holds the definition of users\nwho can participate in the workflow.\nGenerally WorkFlowUsers are decided by the user who is\ncreating the workflow. He can choose the user who will be\npart of workflow while creating the workflow. If a user is not within the\nsystem then a user will be created and invite will be sent to him.
 */
@ApiModel(description = "WorkFlowUser holds the definition of users\nwho can participate in the workflow.\nGenerally WorkFlowUsers are decided by the user who is\ncreating the workflow. He can choose the user who will be\npart of workflow while creating the workflow. If a user is not within the\nsystem then a user will be created and invite will be sent to him.")
@Entity
@Table(name = "work_flow_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WorkFlowUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * indicates the position of user at which he can sign in
     */
    @ApiModelProperty(value = "indicates the position of user at which he can sign in")
    @Column(name = "step")
    private Long step;

    @OneToMany(mappedBy = "workFlowUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DocumentSignature> documentSignatures = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("workFlowUsers")
    private WorkFlow workFlow;

    @ManyToOne
    @JsonIgnoreProperties("workFlowUsers")
    private Users users;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStep() {
        return step;
    }

    public WorkFlowUser step(Long step) {
        this.step = step;
        return this;
    }

    public void setStep(Long step) {
        this.step = step;
    }

    public Set<DocumentSignature> getDocumentSignatures() {
        return documentSignatures;
    }

    public WorkFlowUser documentSignatures(Set<DocumentSignature> documentSignatures) {
        this.documentSignatures = documentSignatures;
        return this;
    }

    public WorkFlowUser addDocumentSignature(DocumentSignature documentSignature) {
        this.documentSignatures.add(documentSignature);
        documentSignature.setWorkFlowUser(this);
        return this;
    }

    public WorkFlowUser removeDocumentSignature(DocumentSignature documentSignature) {
        this.documentSignatures.remove(documentSignature);
        documentSignature.setWorkFlowUser(null);
        return this;
    }

    public void setDocumentSignatures(Set<DocumentSignature> documentSignatures) {
        this.documentSignatures = documentSignatures;
    }

    public WorkFlow getWorkFlow() {
        return workFlow;
    }

    public WorkFlowUser workFlow(WorkFlow workFlow) {
        this.workFlow = workFlow;
        return this;
    }

    public void setWorkFlow(WorkFlow workFlow) {
        this.workFlow = workFlow;
    }

    public Users getUsers() {
        return users;
    }

    public WorkFlowUser users(Users users) {
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
        if (!(o instanceof WorkFlowUser)) {
            return false;
        }
        return id != null && id.equals(((WorkFlowUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "WorkFlowUser{" +
            "id=" + getId() +
            ", step=" + getStep() +
            "}";
    }
}
