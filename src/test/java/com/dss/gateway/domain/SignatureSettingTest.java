package com.dss.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dss.gateway.web.rest.TestUtil;

public class SignatureSettingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SignatureSetting.class);
        SignatureSetting signatureSetting1 = new SignatureSetting();
        signatureSetting1.setId(1L);
        SignatureSetting signatureSetting2 = new SignatureSetting();
        signatureSetting2.setId(signatureSetting1.getId());
        assertThat(signatureSetting1).isEqualTo(signatureSetting2);
        signatureSetting2.setId(2L);
        assertThat(signatureSetting1).isNotEqualTo(signatureSetting2);
        signatureSetting1.setId(null);
        assertThat(signatureSetting1).isNotEqualTo(signatureSetting2);
    }
}
