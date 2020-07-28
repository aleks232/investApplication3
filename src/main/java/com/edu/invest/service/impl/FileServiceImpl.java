package com.edu.invest.service.impl;

import com.edu.invest.domain.FileStorage;
import com.edu.invest.repository.FileStorageRepository;
import com.edu.invest.service.FileService;
import com.edu.invest.service.dto.FileInfo;
import com.edu.invest.service.dto.StorageType;
import com.edu.invest.service.mapper.FileStorageMapper;
import java.io.IOException;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {
    private static final Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private FileStorageMapper fileStorageMapper;

    @Override
    public FileInfo saveFile(MultipartFile file) throws IOException {
        FileStorage fileStorage = new FileStorage(
            file.getBytes(),
            file.getOriginalFilename(),
            file.getContentType(),
            file.getSize(),
            StorageType.POSTGRES
        );

        fileStorage = fileStorageRepository.save(fileStorage);
        logger.debug("fileStorage: {}", fileStorage);

        return fileStorageMapper.toDto(fileStorage);
    }

    @Override
    public FileInfo getMetaInformation(Long id) {
        logger.debug("getMetaInformation id: {}", id);
        FileStorage fileStorage = fileStorageRepository.findById(id).orElse(null);
        FileInfo fileInfo = fileStorageMapper.toDto(fileStorage);
        logger.warn("getMetaInformation fileInfo: {}", fileInfo);
        return fileInfo;
    }

    @Override
    public Pair<FileInfo, byte[]> getFile(Long id) {
        logger.debug("getFile id: {}", id);
        FileStorage fileStorage = fileStorageRepository.findById(id).orElse(null);

        FileInfo fileInfo = fileStorageMapper.toDto(fileStorage);
        logger.warn("getFile fileInfo: {}", fileInfo);

        return Pair.of(fileInfo, fileStorage.getFile());
    }
}
