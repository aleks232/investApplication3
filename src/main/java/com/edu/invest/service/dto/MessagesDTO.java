package com.edu.invest.service.dto;

import io.swagger.annotations.ApiModel;
import java.time.Instant;
import java.io.Serializable;
import com.edu.invest.domain.enumeration.NotificationType;

/**
 * A DTO for the {@link com.edu.invest.domain.Messages} entity.
 */
@ApiModel(description = "Task entity.\n@author The JHipster team.")
public class MessagesDTO implements Serializable {
    
    private Long id;

    private String message;

    private NotificationType notificationType;

    private Instant createDate;

    private Instant confirmDate;

    private Long employeeId;


    private Long lotId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(NotificationType notificationType) {
        this.notificationType = notificationType;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getConfirmDate() {
        return confirmDate;
    }

    public void setConfirmDate(Instant confirmDate) {
        this.confirmDate = confirmDate;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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
        if (!(o instanceof MessagesDTO)) {
            return false;
        }

        return id != null && id.equals(((MessagesDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MessagesDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", notificationType='" + getNotificationType() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", confirmDate='" + getConfirmDate() + "'" +
            ", employeeId=" + getEmployeeId() +
            ", lotId=" + getLotId() +
            "}";
    }
}
