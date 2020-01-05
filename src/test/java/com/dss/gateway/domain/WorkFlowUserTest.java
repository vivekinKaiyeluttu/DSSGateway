package com.dss.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dss.gateway.web.rest.TestUtil;

public class WorkFlowUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkFlowUser.class);
        WorkFlowUser workFlowUser1 = new WorkFlowUser();
        workFlowUser1.setId(1L);
        WorkFlowUser workFlowUser2 = new WorkFlowUser();
        workFlowUser2.setId(workFlowUser1.getId());
        assertThat(workFlowUser1).isEqualTo(workFlowUser2);
        workFlowUser2.setId(2L);
        assertThat(workFlowUser1).isNotEqualTo(workFlowUser2);
        workFlowUser1.setId(null);
        assertThat(workFlowUser1).isNotEqualTo(workFlowUser2);
    }
}
