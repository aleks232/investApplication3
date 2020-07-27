package com.edu.invest.service.mapper;

import com.edu.invest.domain.FileStorage;
import com.edu.invest.domain.Messages;
import com.edu.invest.service.dto.FileInfo;
import com.edu.invest.service.dto.MessagesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface FileStorageMapper extends EntityMapper<FileInfo, FileStorage> {
    FileInfo toDto(FileStorage fileStorage);

    FileStorage toEntity(FileInfo fileInfo);
}
