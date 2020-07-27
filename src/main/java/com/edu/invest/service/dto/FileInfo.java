package com.edu.invest.service.dto;

import java.io.Serializable;
import java.math.BigInteger;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

public class FileInfo implements Serializable {
    private static final long serialVersionUID = 1873305548167368781L;

    public FileInfo() {}

    public FileInfo(Long id) {
        this.id = id;
    }

    public FileInfo(Long id, String fileName) {
        this.id = id;
        this.fileName = fileName;
    }

    public FileInfo(BigInteger id, String fileName, String contentType, String hash, BigInteger size, Date dataLoad, String storageType) {
        this.id = id != null ? id.longValue() : null;
        this.fileName = fileName;
        this.contentType = contentType;
        this.hash = hash;
        this.size = size != null ? size.longValue() : null;
        this.dataLoad = dataLoad != null ? dataLoad.toLocalDate() : null;
    }

    public FileInfo(Long id, String fileName, String contentType, Long size) {
        this.id = id;
        this.fileName = fileName;
        this.contentType = contentType;
        this.size = size;
    }

    public FileInfo(Long id, String fileName, String contentType, String hash, Long size, LocalDate dataLoad) {
        this.id = id;
        this.fileName = fileName;
        this.contentType = contentType;
        this.hash = hash;
        this.size = size;
        this.dataLoad = dataLoad;
    }

    private Long id;
    private String fileName;
    private String contentType;
    private String hash;
    private Long size;
    private String storageId;
    private StorageType storageType;

    private LocalDate dataLoad;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public LocalDate getDataLoad() {
        return dataLoad;
    }

    public void setDataLoad(LocalDate dataLoad) {
        this.dataLoad = dataLoad;
    }

    public String getStorageId() {
        return storageId;
    }

    public void setStorageId(String storageId) {
        this.storageId = storageId;
    }

    public StorageType getStorageType() {
        return storageType;
    }

    public void setStorageType(StorageType storageType) {
        this.storageType = storageType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileInfo fileInfo = (FileInfo) o;
        return (
            Objects.equals(id, fileInfo.id) &&
            Objects.equals(fileName, fileInfo.fileName) &&
            Objects.equals(contentType, fileInfo.contentType) &&
            Objects.equals(hash, fileInfo.hash) &&
            Objects.equals(size, fileInfo.size) &&
            Objects.equals(storageId, fileInfo.storageId) &&
            Objects.equals(dataLoad, fileInfo.dataLoad)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fileName, contentType, hash, size, dataLoad, storageId);
    }

    @Override
    public String toString() {
        return (
            "FileInfo{" +
            "id=" +
            id +
            ", fileName='" +
            fileName +
            '\'' +
            ", contentType='" +
            contentType +
            '\'' +
            ", hash='" +
            hash +
            '\'' +
            ", size=" +
            size +
            ", dataLoad=" +
            dataLoad +
            ", storageId=" +
            storageId +
            '}'
        );
    }
}
