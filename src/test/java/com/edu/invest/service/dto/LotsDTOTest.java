package com.edu.invest.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.edu.invest.web.rest.TestUtil;

public class LotsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LotsDTO.class);
        LotsDTO lotsDTO1 = new LotsDTO();
        lotsDTO1.setId(1L);
        LotsDTO lotsDTO2 = new LotsDTO();
        assertThat(lotsDTO1).isNotEqualTo(lotsDTO2);
        lotsDTO2.setId(lotsDTO1.getId());
        assertThat(lotsDTO1).isEqualTo(lotsDTO2);
        lotsDTO2.setId(2L);
        assertThat(lotsDTO1).isNotEqualTo(lotsDTO2);
        lotsDTO1.setId(null);
        assertThat(lotsDTO1).isNotEqualTo(lotsDTO2);
    }
}
