package com.edu.invest.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.edu.invest.web.rest.TestUtil;

public class PackagesDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PackagesDTO.class);
        PackagesDTO packagesDTO1 = new PackagesDTO();
        packagesDTO1.setId(1L);
        PackagesDTO packagesDTO2 = new PackagesDTO();
        assertThat(packagesDTO1).isNotEqualTo(packagesDTO2);
        packagesDTO2.setId(packagesDTO1.getId());
        assertThat(packagesDTO1).isEqualTo(packagesDTO2);
        packagesDTO2.setId(2L);
        assertThat(packagesDTO1).isNotEqualTo(packagesDTO2);
        packagesDTO1.setId(null);
        assertThat(packagesDTO1).isNotEqualTo(packagesDTO2);
    }
}
