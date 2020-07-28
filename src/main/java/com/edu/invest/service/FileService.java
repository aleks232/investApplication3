package com.edu.invest.service;

import com.edu.invest.service.dto.FileInfo;
import java.io.IOException;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    FileInfo saveFile(MultipartFile file) throws IOException;

    FileInfo getMetaInformation(Long id);
    Pair<FileInfo, byte[]> getFile(Long id);
}
