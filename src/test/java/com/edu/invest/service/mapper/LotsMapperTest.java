package com.edu.invest.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LotsMapperTest {

    private LotsMapper lotsMapper;

    @BeforeEach
    public void setUp() {
        lotsMapper = new LotsMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(lotsMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(lotsMapper.fromId(null)).isNull();
    }
}
