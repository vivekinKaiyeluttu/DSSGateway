package com.dss.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.dss.gateway.web.rest.TestUtil;

public class DocumentSignatureTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentSignature.class);
        DocumentSignature documentSignature1 = new DocumentSignature();
        documentSignature1.setId(1L);
        DocumentSignature documentSignature2 = new DocumentSignature();
        documentSignature2.setId(documentSignature1.getId());
        assertThat(documentSignature1).isEqualTo(documentSignature2);
        documentSignature2.setId(2L);
        assertThat(documentSignature1).isNotEqualTo(documentSignature2);
        documentSignature1.setId(null);
        assertThat(documentSignature1).isNotEqualTo(documentSignature2);
    }
}
