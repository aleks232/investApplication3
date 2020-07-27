package com.edu.invest.domain;

import com.edu.invest.service.dto.StorageType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.*;

/**
 *
 */
@Entity
@Table(name = "file_storage")
public class FileStorage implements Serializable {

    public FileStorage() {}

    public FileStorage(byte[] file, String fileName, String contentType, Long size, StorageType storageType) {
        this.file = file;
        this.fileName = fileName;
        this.contentType = contentType;
        this.size = size;
        this.storageType = storageType;
    }

    private static final long serialVersionUID = -5141168075174628757L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    protected Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "hash")
    private String hash;

    @Column(name = "dataLoad")
    private LocalDate dataLoad = LocalDate.now();

    @Column(name = "size")
    private Long size;

    //  id внешней системы
    @Column(name = "storage_id")
    private String storageId;

    //  тип системы
    @Enumerated(EnumType.STRING)
    @Column(name = "storage_type", length = 20)
    private StorageType storageType;

    @Lob
    @Column(name = "file")
    private byte[] file;

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

    public LocalDate getDataLoad() {
        return dataLoad;
    }

    public void setDataLoad(LocalDate dataLoad) {
        this.dataLoad = dataLoad;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
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
        if (!super.equals(o)) return false;
        FileStorage that = (FileStorage) o;
        return (
            Objects.equals(fileName, that.fileName) &&
            Objects.equals(contentType, that.contentType) &&
            Objects.equals(hash, that.hash) &&
            Objects.equals(dataLoad, that.dataLoad) &&
            Objects.equals(size, that.size) &&
            Objects.equals(storageId, that.storageId) &&
            storageType == that.storageType
        );
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(super.hashCode(), fileName, contentType, hash, dataLoad, size, storageId, storageType);
        return result;
    }
}
