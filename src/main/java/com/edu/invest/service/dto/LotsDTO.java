package com.edu.invest.service.dto;

import io.swagger.annotations.ApiModelProperty;
import java.time.Instant;
import java.io.Serializable;

/**
 * A DTO for the {@link com.edu.invest.domain.Lots} entity.
 */
public class LotsDTO implements Serializable {
    
    private Long id;

    private String description;

    private Long minPrice;

    private Instant startDate;

    private Instant endDate;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Long minPrice) {
        this.minPrice = minPrice;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LotsDTO)) {
            return false;
        }

        return id != null && id.equals(((LotsDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LotsDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", minPrice=" + getMinPrice() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
