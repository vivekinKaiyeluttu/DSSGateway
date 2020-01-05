package com.dss.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dss.gateway.web.rest.TestUtil;

public class UserRoleMappingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRoleMapping.class);
        UserRoleMapping userRoleMapping1 = new UserRoleMapping();
        userRoleMapping1.setId(1L);
        UserRoleMapping userRoleMapping2 = new UserRoleMapping();
        userRoleMapping2.setId(userRoleMapping1.getId());
        assertThat(userRoleMapping1).isEqualTo(userRoleMapping2);
        userRoleMapping2.setId(2L);
        assertThat(userRoleMapping1).isNotEqualTo(userRoleMapping2);
        userRoleMapping1.setId(null);
        assertThat(userRoleMapping1).isNotEqualTo(userRoleMapping2);
    }
}
