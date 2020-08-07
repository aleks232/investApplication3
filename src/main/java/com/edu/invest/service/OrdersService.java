package com.edu.invest.service;

import com.edu.invest.service.dto.OrdersDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.edu.invest.domain.Orders}.
 */
public interface OrdersService {
    /**
     * Save a orders.
     *
     * @param ordersDTO the entity to save.
     * @return the persisted entity.
     */
    OrdersDTO save(OrdersDTO ordersDTO);

    /**
     * Get all the orders.
     *
     * @return the list of entities.
     */
    List<OrdersDTO> findAll();

    List<OrdersDTO> findOrders(Long lotId, String orderStatus);

    /**
     * Get the "id" orders.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrdersDTO> findOne(Long id);

    /**
     * Delete the "id" orders.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
