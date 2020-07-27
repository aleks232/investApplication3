package com.edu.invest.service.mapper;


import com.edu.invest.domain.*;
import com.edu.invest.service.dto.PackagesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Packages} and its DTO {@link PackagesDTO}.
 */
@Mapper(componentModel = "spring", uses = {LotsMapper.class})
public interface PackagesMapper extends EntityMapper<PackagesDTO, Packages> {

    @Mapping(source = "lot.id", target = "lotId")
    PackagesDTO toDto(Packages packages);

    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "removeDocuments", ignore = true)
    @Mapping(source = "lotId", target = "lot")
    Packages toEntity(PackagesDTO packagesDTO);

    default Packages fromId(Long id) {
        if (id == null) {
            return null;
        }
        Packages packages = new Packages();
        packages.setId(id);
        return packages;
    }
}
