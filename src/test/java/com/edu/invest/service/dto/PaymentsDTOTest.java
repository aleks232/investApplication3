package com.edu.invest.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.edu.invest.web.rest.TestUtil;

public class PaymentsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentsDTO.class);
        PaymentsDTO paymentsDTO1 = new PaymentsDTO();
        paymentsDTO1.setId(1L);
        PaymentsDTO paymentsDTO2 = new PaymentsDTO();
        assertThat(paymentsDTO1).isNotEqualTo(paymentsDTO2);
        paymentsDTO2.setId(paymentsDTO1.getId());
        assertThat(paymentsDTO1).isEqualTo(paymentsDTO2);
        paymentsDTO2.setId(2L);
        assertThat(paymentsDTO1).isNotEqualTo(paymentsDTO2);
        paymentsDTO1.setId(null);
        assertThat(paymentsDTO1).isNotEqualTo(paymentsDTO2);
    }
}
