package com.edu.invest.service.mapper;


import com.edu.invest.domain.*;
import com.edu.invest.service.dto.LotsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Lots} and its DTO {@link LotsDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LotsMapper extends EntityMapper<LotsDTO, Lots> {


    @Mapping(target = "messages", ignore = true)
    @Mapping(target = "removeMessages", ignore = true)
    @Mapping(target = "orders", ignore = true)
    @Mapping(target = "removeOrders", ignore = true)
    @Mapping(target = "packages", ignore = true)
    @Mapping(target = "removePackages", ignore = true)
    Lots toEntity(LotsDTO lotsDTO);

    default Lots fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lots lots = new Lots();
        lots.setId(id);
        return lots;
    }
}
