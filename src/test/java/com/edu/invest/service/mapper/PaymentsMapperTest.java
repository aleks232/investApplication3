package com.edu.invest.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PaymentsMapperTest {

    private PaymentsMapper paymentsMapper;

    @BeforeEach
    public void setUp() {
        paymentsMapper = new PaymentsMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(paymentsMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(paymentsMapper.fromId(null)).isNull();
    }
}
