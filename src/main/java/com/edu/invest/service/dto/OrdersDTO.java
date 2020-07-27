package com.edu.invest.service.dto;

import java.time.Instant;
import java.io.Serializable;
import com.edu.invest.domain.enumeration.PaymentType;
import com.edu.invest.domain.enumeration.OrderStatus;

/**
 * A DTO for the {@link com.edu.invest.domain.Orders} entity.
 */
public class OrdersDTO implements Serializable {
    
    private Long id;

    private Instant startDate;

    private Instant endDate;

    private Long price;

    private PaymentType paymentType;

    private OrderStatus orderStatus;

    private Long employeeId;


    private Long lotId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
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
        if (!(o instanceof OrdersDTO)) {
            return false;
        }

        return id != null && id.equals(((OrdersDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrdersDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", price=" + getPrice() +
            ", paymentType='" + getPaymentType() + "'" +
            ", orderStatus='" + getOrderStatus() + "'" +
            ", employeeId=" + getEmployeeId() +
            ", lotId=" + getLotId() +
            "}";
    }
}
