package com.dss.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dss.gateway.web.rest.TestUtil;

public class RolePermissionMappingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolePermissionMapping.class);
        RolePermissionMapping rolePermissionMapping1 = new RolePermissionMapping();
        rolePermissionMapping1.setId(1L);
        RolePermissionMapping rolePermissionMapping2 = new RolePermissionMapping();
        rolePermissionMapping2.setId(rolePermissionMapping1.getId());
        assertThat(rolePermissionMapping1).isEqualTo(rolePermissionMapping2);
        rolePermissionMapping2.setId(2L);
        assertThat(rolePermissionMapping1).isNotEqualTo(rolePermissionMapping2);
        rolePermissionMapping1.setId(null);
        assertThat(rolePermissionMapping1).isNotEqualTo(rolePermissionMapping2);
    }
}
