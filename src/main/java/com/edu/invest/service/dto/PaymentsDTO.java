package com.edu.invest.service.dto;

import java.time.Instant;
import java.io.Serializable;

/**
 * A DTO for the {@link com.edu.invest.domain.Payments} entity.
 */
public class PaymentsDTO implements Serializable {
    
    private Long id;

    private Instant sendDate;

    private Instant paymentDate;

    private Long price;

    private Long employeeId;


    private Long orderId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getSendDate() {
        return sendDate;
    }

    public void setSendDate(Instant sendDate) {
        this.sendDate = sendDate;
    }

    public Instant getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Instant paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long ordersId) {
        this.orderId = ordersId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaymentsDTO)) {
            return false;
        }

        return id != null && id.equals(((PaymentsDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaymentsDTO{" +
            "id=" + getId() +
            ", sendDate='" + getSendDate() + "'" +
            ", paymentDate='" + getPaymentDate() + "'" +
            ", price=" + getPrice() +
            ", employeeId=" + getEmployeeId() +
            ", orderId=" + getOrderId() +
            "}";
    }
}
