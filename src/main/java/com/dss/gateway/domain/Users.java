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
import java.util.HashSet;
import java.util.Set;

/**
 * Users are the actors in the application who basically have\ncapablities like creating work_flow, signing a document as part of work_flow\nand verify the document that's been signed by others.
 */
@ApiModel(description = "Users are the actors in the application who basically have\ncapablities like creating work_flow, signing a document as part of work_flow\nand verify the document that's been signed by others.")
@Entity
@Table(name = "users")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Users implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * firstname of the user
     */
    @NotNull
    @ApiModelProperty(value = "firstname of the user", required = true)
    @Column(name = "first_name", nullable = false)
    private String firstName;

    /**
     * lastname of the user
     */
    @ApiModelProperty(value = "lastname of the user")
    @Column(name = "last_name")
    private String lastName;

    /**
     * user email
     */
    @NotNull
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$")
    @ApiModelProperty(value = "user email", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * password that can be used to login
     */
    @NotNull
    @ApiModelProperty(value = "password that can be used to login", required = true)
    @Column(name = "password", nullable = false)
    private String password;

    /**
     * will be used during signup flow and in forget password flow
     */
    @ApiModelProperty(value = "will be used during signup flow and in forget password flow")
    @Column(name = "verified")
    private Boolean verified;

    /**
     * challenge that can be used while forget password flow and invite flow
     */
    @ApiModelProperty(value = "challenge that can be used while forget password flow and invite flow")
    @Column(name = "challenge_token")
    private String challengeToken;

    /**
     * if an user dosn't have account while initiating WorkFlow then we will set
     */
    @ApiModelProperty(value = "if an user dosn't have account while initiating WorkFlow then we will set")
    @Column(name = "work_flow_initiate")
    private Boolean workFlowInitiate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserRoleMapping> userRoleMappings = new HashSet<>();

    @OneToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SignatureSetting> signatureSettings = new HashSet<>();

    @OneToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkFlow> workFlows = new HashSet<>();

    @OneToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkFlowUser> workFlowUsers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("users")
    private Tenant tenant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Users firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Users lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Users email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public Users password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isVerified() {
        return verified;
    }

    public Users verified(Boolean verified) {
        this.verified = verified;
        return this;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public String getChallengeToken() {
        return challengeToken;
    }

    public Users challengeToken(String challengeToken) {
        this.challengeToken = challengeToken;
        return this;
    }

    public void setChallengeToken(String challengeToken) {
        this.challengeToken = challengeToken;
    }

    public Boolean isWorkFlowInitiate() {
        return workFlowInitiate;
    }

    public Users workFlowInitiate(Boolean workFlowInitiate) {
        this.workFlowInitiate = workFlowInitiate;
        return this;
    }

    public void setWorkFlowInitiate(Boolean workFlowInitiate) {
        this.workFlowInitiate = workFlowInitiate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Users createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public Users createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public Users updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public Users updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<UserRoleMapping> getUserRoleMappings() {
        return userRoleMappings;
    }

    public Users userRoleMappings(Set<UserRoleMapping> userRoleMappings) {
        this.userRoleMappings = userRoleMappings;
        return this;
    }

    public Users addUserRoleMapping(UserRoleMapping userRoleMapping) {
        this.userRoleMappings.add(userRoleMapping);
        userRoleMapping.setUsers(this);
        return this;
    }

    public Users removeUserRoleMapping(UserRoleMapping userRoleMapping) {
        this.userRoleMappings.remove(userRoleMapping);
        userRoleMapping.setUsers(null);
        return this;
    }

    public void setUserRoleMappings(Set<UserRoleMapping> userRoleMappings) {
        this.userRoleMappings = userRoleMappings;
    }

    public Set<SignatureSetting> getSignatureSettings() {
        return signatureSettings;
    }

    public Users signatureSettings(Set<SignatureSetting> signatureSettings) {
        this.signatureSettings = signatureSettings;
        return this;
    }

    public Users addSignatureSetting(SignatureSetting signatureSetting) {
        this.signatureSettings.add(signatureSetting);
        signatureSetting.setUsers(this);
        return this;
    }

    public Users removeSignatureSetting(SignatureSetting signatureSetting) {
        this.signatureSettings.remove(signatureSetting);
        signatureSetting.setUsers(null);
        return this;
    }

    public void setSignatureSettings(Set<SignatureSetting> signatureSettings) {
        this.signatureSettings = signatureSettings;
    }

    public Set<WorkFlow> getWorkFlows() {
        return workFlows;
    }

    public Users workFlows(Set<WorkFlow> workFlows) {
        this.workFlows = workFlows;
        return this;
    }

    public Users addWorkFlow(WorkFlow workFlow) {
        this.workFlows.add(workFlow);
        workFlow.setUsers(this);
        return this;
    }

    public Users removeWorkFlow(WorkFlow workFlow) {
        this.workFlows.remove(workFlow);
        workFlow.setUsers(null);
        return this;
    }

    public void setWorkFlows(Set<WorkFlow> workFlows) {
        this.workFlows = workFlows;
    }

    public Set<WorkFlowUser> getWorkFlowUsers() {
        return workFlowUsers;
    }

    public Users workFlowUsers(Set<WorkFlowUser> workFlowUsers) {
        this.workFlowUsers = workFlowUsers;
        return this;
    }

    public Users addWorkFlowUser(WorkFlowUser workFlowUser) {
        this.workFlowUsers.add(workFlowUser);
        workFlowUser.setUsers(this);
        return this;
    }

    public Users removeWorkFlowUser(WorkFlowUser workFlowUser) {
        this.workFlowUsers.remove(workFlowUser);
        workFlowUser.setUsers(null);
        return this;
    }

    public void setWorkFlowUsers(Set<WorkFlowUser> workFlowUsers) {
        this.workFlowUsers = workFlowUsers;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public Users tenant(Tenant tenant) {
        this.tenant = tenant;
        return this;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Users)) {
            return false;
        }
        return id != null && id.equals(((Users) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Users{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", verified='" + isVerified() + "'" +
            ", challengeToken='" + getChallengeToken() + "'" +
            ", workFlowInitiate='" + isWorkFlowInitiate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
