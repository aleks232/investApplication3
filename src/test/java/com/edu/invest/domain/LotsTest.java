package com.edu.invest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.edu.invest.web.rest.TestUtil;

public class LotsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lots.class);
        Lots lots1 = new Lots();
        lots1.setId(1L);
        Lots lots2 = new Lots();
        lots2.setId(lots1.getId());
        assertThat(lots1).isEqualTo(lots2);
        lots2.setId(2L);
        assertThat(lots1).isNotEqualTo(lots2);
        lots1.setId(null);
        assertThat(lots1).isNotEqualTo(lots2);
    }
}
