package com.edu.invest.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.edu.invest.domain.Packages} entity.
 */
public class PackagesDTO implements Serializable {
    
    private Long id;

    private String title;

    private String description;


    private Long lotId;
    
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

    public Long getLotId() {
        return lotId;
    }

    public void setLotId(Long lotsId) {
        this.lotId = lotsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PackagesDTO)) {
            return false;
        }

        return id != null && id.equals(((PackagesDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PackagesDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", lotId=" + getLotId() +
            "}";
    }
}
