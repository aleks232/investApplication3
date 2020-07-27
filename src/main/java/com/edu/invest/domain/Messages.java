package com.edu.invest.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import com.edu.invest.domain.enumeration.NotificationType;

/**
 * Task entity.\n@author The JHipster team.
 */
@Entity
@Table(name = "messages")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Messages implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "message")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type")
    private NotificationType notificationType;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "confirm_date")
    private Instant confirmDate;

    @Column(name = "employee_id")
    private Long employeeId;

    @ManyToOne
    @JsonIgnoreProperties(value = "messages", allowSetters = true)
    private Lots lot;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public Messages message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }

    public Messages notificationType(NotificationType notificationType) {
        this.notificationType = notificationType;
        return this;
    }

    public void setNotificationType(NotificationType notificationType) {
        this.notificationType = notificationType;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Messages createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getConfirmDate() {
        return confirmDate;
    }

    public Messages confirmDate(Instant confirmDate) {
        this.confirmDate = confirmDate;
        return this;
    }

    public void setConfirmDate(Instant confirmDate) {
        this.confirmDate = confirmDate;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public Messages employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Lots getLot() {
        return lot;
    }

    public Messages lot(Lots lots) {
        this.lot = lots;
        return this;
    }

    public void setLot(Lots lots) {
        this.lot = lots;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Messages)) {
            return false;
        }
        return id != null && id.equals(((Messages) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Messages{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", notificationType='" + getNotificationType() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", confirmDate='" + getConfirmDate() + "'" +
            ", employeeId=" + getEmployeeId() +
            "}";
    }
}
