package com.edu.invest.repository;

import com.edu.invest.domain.Lots;
import com.edu.invest.domain.Orders;
import com.edu.invest.domain.enumeration.OrderStatus;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Orders entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByLot(Lots lot);
    List<Orders> findByLotAndOrderStatus(Lots lot, OrderStatus orderStatus);
    List<Orders> findByOrderStatus(OrderStatus orderStatus);
}
