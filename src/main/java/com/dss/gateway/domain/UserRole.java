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
 * UserRole is used to maintain the list of roles that are associated\nfor a particular tenant. As there is a possiblity for need of customization\nof roles for each and every tenant.
 */
@ApiModel(description = "UserRole is used to maintain the list of roles that are associated\nfor a particular tenant. As there is a possiblity for need of customization\nof roles for each and every tenant.")
@Entity
@Table(name = "user_role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * name of the role
     */
    @ApiModelProperty(value = "name of the role")
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "userRole")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RolePermissionMapping> rolePermissionMappings = new HashSet<>();

    @OneToMany(mappedBy = "userRole")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserRoleMapping> userRoleMappings = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("userRoles")
    private Tenant tenant;

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

    public UserRole name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<RolePermissionMapping> getRolePermissionMappings() {
        return rolePermissionMappings;
    }

    public UserRole rolePermissionMappings(Set<RolePermissionMapping> rolePermissionMappings) {
        this.rolePermissionMappings = rolePermissionMappings;
        return this;
    }

    public UserRole addRolePermissionMapping(RolePermissionMapping rolePermissionMapping) {
        this.rolePermissionMappings.add(rolePermissionMapping);
        rolePermissionMapping.setUserRole(this);
        return this;
    }

    public UserRole removeRolePermissionMapping(RolePermissionMapping rolePermissionMapping) {
        this.rolePermissionMappings.remove(rolePermissionMapping);
        rolePermissionMapping.setUserRole(null);
        return this;
    }

    public void setRolePermissionMappings(Set<RolePermissionMapping> rolePermissionMappings) {
        this.rolePermissionMappings = rolePermissionMappings;
    }

    public Set<UserRoleMapping> getUserRoleMappings() {
        return userRoleMappings;
    }

    public UserRole userRoleMappings(Set<UserRoleMapping> userRoleMappings) {
        this.userRoleMappings = userRoleMappings;
        return this;
    }

    public UserRole addUserRoleMapping(UserRoleMapping userRoleMapping) {
        this.userRoleMappings.add(userRoleMapping);
        userRoleMapping.setUserRole(this);
        return this;
    }

    public UserRole removeUserRoleMapping(UserRoleMapping userRoleMapping) {
        this.userRoleMappings.remove(userRoleMapping);
        userRoleMapping.setUserRole(null);
        return this;
    }

    public void setUserRoleMappings(Set<UserRoleMapping> userRoleMappings) {
        this.userRoleMappings = userRoleMappings;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public UserRole tenant(Tenant tenant) {
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
        if (!(o instanceof UserRole)) {
            return false;
        }
        return id != null && id.equals(((UserRole) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserRole{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
