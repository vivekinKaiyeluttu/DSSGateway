package com.dss.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dss.gateway.web.rest.TestUtil;

public class WorkFlowTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkFlow.class);
        WorkFlow workFlow1 = new WorkFlow();
        workFlow1.setId(1L);
        WorkFlow workFlow2 = new WorkFlow();
        workFlow2.setId(workFlow1.getId());
        assertThat(workFlow1).isEqualTo(workFlow2);
        workFlow2.setId(2L);
        assertThat(workFlow1).isNotEqualTo(workFlow2);
        workFlow1.setId(null);
        assertThat(workFlow1).isNotEqualTo(workFlow2);
    }
}
