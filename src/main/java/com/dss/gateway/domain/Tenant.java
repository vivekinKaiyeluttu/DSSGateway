package com.dss.gateway.domain;
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
 * Tenant will be used to implement & identify tenancy\nof the user in service. Default organization of an user would be\nfrom Kaiyeluthu. Tenant will be onboarded through different flows not\ntargetted for the first cut release. So all users will belong to\nKaiyeluthu by default.
 */
@ApiModel(description = "Tenant will be used to implement & identify tenancy\nof the user in service. Default organization of an user would be\nfrom Kaiyeluthu. Tenant will be onboarded through different flows not\ntargetted for the first cut release. So all users will belong to\nKaiyeluthu by default.")
@Entity
@Table(name = "tenant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tenant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Name of the Tenant
     */
    @NotNull
    @ApiModelProperty(value = "Name of the Tenant", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * URL of the Tenant
     */
    @ApiModelProperty(value = "URL of the Tenant")
    @Column(name = "domain")
    private String domain;

    /**
     * Primary Email contact in tenant
     */
    @NotNull
    @ApiModelProperty(value = "Primary Email contact in tenant", required = true)
    @Column(name = "primary_email", nullable = false)
    private String primaryEmail;

    /**
     * Secondary Email contact in tenant
     */
    @ApiModelProperty(value = "Secondary Email contact in tenant")
    @Column(name = "secondary_email")
    private String secondaryEmail;

    /**
     * Name of the Organization
     */
    @NotNull
    @ApiModelProperty(value = "Name of the Organization", required = true)
    @Column(name = "organization", nullable = false)
    private String organization;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToMany(mappedBy = "tenant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Users> users = new HashSet<>();

    @OneToMany(mappedBy = "tenant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserRole> userRoles = new HashSet<>();

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

    public Tenant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomain() {
        return domain;
    }

    public Tenant domain(String domain) {
        this.domain = domain;
        return this;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getPrimaryEmail() {
        return primaryEmail;
    }

    public Tenant primaryEmail(String primaryEmail) {
        this.primaryEmail = primaryEmail;
        return this;
    }

    public void setPrimaryEmail(String primaryEmail) {
        this.primaryEmail = primaryEmail;
    }

    public String getSecondaryEmail() {
        return secondaryEmail;
    }

    public Tenant secondaryEmail(String secondaryEmail) {
        this.secondaryEmail = secondaryEmail;
        return this;
    }

    public void setSecondaryEmail(String secondaryEmail) {
        this.secondaryEmail = secondaryEmail;
    }

    public String getOrganization() {
        return organization;
    }

    public Tenant organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Tenant createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public Tenant createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public Tenant updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public Tenant updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Users> getUsers() {
        return users;
    }

    public Tenant users(Set<Users> users) {
        this.users = users;
        return this;
    }

    public Tenant addUsers(Users users) {
        this.users.add(users);
        users.setTenant(this);
        return this;
    }

    public Tenant removeUsers(Users users) {
        this.users.remove(users);
        users.setTenant(null);
        return this;
    }

    public void setUsers(Set<Users> users) {
        this.users = users;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public Tenant userRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
        return this;
    }

    public Tenant addUserRole(UserRole userRole) {
        this.userRoles.add(userRole);
        userRole.setTenant(this);
        return this;
    }

    public Tenant removeUserRole(UserRole userRole) {
        this.userRoles.remove(userRole);
        userRole.setTenant(null);
        return this;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tenant)) {
            return false;
        }
        return id != null && id.equals(((Tenant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tenant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", domain='" + getDomain() + "'" +
            ", primaryEmail='" + getPrimaryEmail() + "'" +
            ", secondaryEmail='" + getSecondaryEmail() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
