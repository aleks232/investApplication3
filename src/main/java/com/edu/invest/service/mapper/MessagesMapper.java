package com.edu.invest.service.mapper;


import com.edu.invest.domain.*;
import com.edu.invest.service.dto.MessagesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Messages} and its DTO {@link MessagesDTO}.
 */
@Mapper(componentModel = "spring", uses = {LotsMapper.class})
public interface MessagesMapper extends EntityMapper<MessagesDTO, Messages> {

    @Mapping(source = "lot.id", target = "lotId")
    MessagesDTO toDto(Messages messages);

    @Mapping(source = "lotId", target = "lot")
    Messages toEntity(MessagesDTO messagesDTO);

    default Messages fromId(Long id) {
        if (id == null) {
            return null;
        }
        Messages messages = new Messages();
        messages.setId(id);
        return messages;
    }
}
