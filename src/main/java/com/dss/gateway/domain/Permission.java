package com.dss.gateway.domain;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.dss.gateway.domain.enumeration.Permissions;

/**
 * Permission are the list of possible permissions that are avaliable in the\napplication.
 */
@ApiModel(description = "Permission are the list of possible permissions that are avaliable in the\napplication.")
@Entity
@Table(name = "permission")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Permission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private Permissions name;

    @OneToMany(mappedBy = "permission")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RolePermissionMapping> rolePermissionMappings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Permissions getName() {
        return name;
    }

    public Permission name(Permissions name) {
        this.name = name;
        return this;
    }

    public void setName(Permissions name) {
        this.name = name;
    }

    public Set<RolePermissionMapping> getRolePermissionMappings() {
        return rolePermissionMappings;
    }

    public Permission rolePermissionMappings(Set<RolePermissionMapping> rolePermissionMappings) {
        this.rolePermissionMappings = rolePermissionMappings;
        return this;
    }

    public Permission addRolePermissionMapping(RolePermissionMapping rolePermissionMapping) {
        this.rolePermissionMappings.add(rolePermissionMapping);
        rolePermissionMapping.setPermission(this);
        return this;
    }

    public Permission removeRolePermissionMapping(RolePermissionMapping rolePermissionMapping) {
        this.rolePermissionMappings.remove(rolePermissionMapping);
        rolePermissionMapping.setPermission(null);
        return this;
    }

    public void setRolePermissionMappings(Set<RolePermissionMapping> rolePermissionMappings) {
        this.rolePermissionMappings = rolePermissionMappings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Permission)) {
            return false;
        }
        return id != null && id.equals(((Permission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Permission{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
