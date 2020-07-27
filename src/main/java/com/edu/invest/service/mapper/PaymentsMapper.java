package com.edu.invest.service.mapper;


import com.edu.invest.domain.*;
import com.edu.invest.service.dto.PaymentsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Payments} and its DTO {@link PaymentsDTO}.
 */
@Mapper(componentModel = "spring", uses = {OrdersMapper.class})
public interface PaymentsMapper extends EntityMapper<PaymentsDTO, Payments> {

    @Mapping(source = "order.id", target = "orderId")
    PaymentsDTO toDto(Payments payments);

    @Mapping(source = "orderId", target = "order")
    Payments toEntity(PaymentsDTO paymentsDTO);

    default Payments fromId(Long id) {
        if (id == null) {
            return null;
        }
        Payments payments = new Payments();
        payments.setId(id);
        return payments;
    }
}
