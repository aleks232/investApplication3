package com.edu.invest.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.edu.invest.domain.Documents} entity.
 */
public class DocumentsDTO implements Serializable {
    
    private Long id;

    private String title;

    private String description;

    private String type;


    private Long packageDocumentId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getPackageDocumentId() {
        return packageDocumentId;
    }

    public void setPackageDocumentId(Long packagesId) {
        this.packageDocumentId = packagesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentsDTO)) {
            return false;
        }

        return id != null && id.equals(((DocumentsDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DocumentsDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", packageDocumentId=" + getPackageDocumentId() +
            "}";
    }
}
