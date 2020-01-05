package com.dss.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.dss.gateway.domain.enumeration.Status;

/**
 * WorkFlow holds the definition of document\nsigning workflow. A user who is creating a workflow\nneed not to be a part of the workflow.
 */
@ApiModel(description = "WorkFlow holds the definition of document\nsigning workflow. A user who is creating a workflow\nneed not to be a part of the workflow.")
@Entity
@Table(name = "work_flow")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WorkFlow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToMany(mappedBy = "workFlow")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkFlowUser> workFlowUsers = new HashSet<>();

    @OneToMany(mappedBy = "workFlow")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> documents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("workFlows")
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

    public WorkFlow name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Status getStatus() {
        return status;
    }

    public WorkFlow status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public WorkFlow createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public WorkFlow updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<WorkFlowUser> getWorkFlowUsers() {
        return workFlowUsers;
    }

    public WorkFlow workFlowUsers(Set<WorkFlowUser> workFlowUsers) {
        this.workFlowUsers = workFlowUsers;
        return this;
    }

    public WorkFlow addWorkFlowUser(WorkFlowUser workFlowUser) {
        this.workFlowUsers.add(workFlowUser);
        workFlowUser.setWorkFlow(this);
        return this;
    }

    public WorkFlow removeWorkFlowUser(WorkFlowUser workFlowUser) {
        this.workFlowUsers.remove(workFlowUser);
        workFlowUser.setWorkFlow(null);
        return this;
    }

    public void setWorkFlowUsers(Set<WorkFlowUser> workFlowUsers) {
        this.workFlowUsers = workFlowUsers;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public WorkFlow documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public WorkFlow addDocument(Document document) {
        this.documents.add(document);
        document.setWorkFlow(this);
        return this;
    }

    public WorkFlow removeDocument(Document document) {
        this.documents.remove(document);
        document.setWorkFlow(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Users getUsers() {
        return users;
    }

    public WorkFlow users(Users users) {
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
        if (!(o instanceof WorkFlow)) {
            return false;
        }
        return id != null && id.equals(((WorkFlow) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "WorkFlow{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
