package com.edu.invest.web.rest;

import com.edu.invest.service.FileService;
import com.edu.invest.service.dto.FileInfo;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("api/rest/files")
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileService fileService;

    @PostMapping(value = "/upload")
    @ApiOperation(value = "Загрузить файл", notes = "Метод позволяет загрузить MultipartFile с заданным именем")
    public @ResponseBody ResponseEntity<FileInfo> handleFileUpload(@ApiParam("Загружаемый файл") @RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            FileInfo fileInfo = fileService.saveFile(file);
            return ResponseEntity.ok(fileInfo);
        } catch (Exception e) {
            logger.error("--- Exception ---");
            logger.error("Error in handleFileUpload: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Получение метаданных", notes = "Получение метаданных загруженного файла по его id")
    public ResponseEntity<FileInfo> getMeta(@ApiParam(value = "id файла", example = "0") @PathVariable("id") Long id) {
        FileInfo fileInfo = fileService.getMetaInformation(id);
        return ResponseEntity.ok(fileInfo);
    }

    @GetMapping(value = "/download/{id}")
    @ApiOperation(value = "Скачать файл", notes = "Метод позволяет скачать файл по его id")
    public void download(@ApiParam(value = "id файла", example = "0") @PathVariable("id") Long id, HttpServletResponse response)
        throws IOException {
        Pair<FileInfo, byte[]> pair = fileService.getFile(id);
        FileInfo fileInfo = pair.getKey();
        response.setContentType(fileInfo.getContentType());
        response.setHeader(
            "Content-Disposition",
            "attachment; filename=\"" + MimeUtility.encodeWord(fileInfo.getFileName(), "utf-8", "Q") + "\""
        );
        response.setHeader("Cache-Control", "max-age=31536000");
        IOUtils.write(pair.getValue(), response.getOutputStream());
        response.flushBuffer();
    }
}
