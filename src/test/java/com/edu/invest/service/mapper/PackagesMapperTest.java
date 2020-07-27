package com.edu.invest.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PackagesMapperTest {

    private PackagesMapper packagesMapper;

    @BeforeEach
    public void setUp() {
        packagesMapper = new PackagesMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(packagesMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(packagesMapper.fromId(null)).isNull();
    }
}
