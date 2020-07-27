package com.edu.invest.service;

import com.edu.invest.service.dto.PaymentsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.edu.invest.domain.Payments}.
 */
public interface PaymentsService {

    /**
     * Save a payments.
     *
     * @param paymentsDTO the entity to save.
     * @return the persisted entity.
     */
    PaymentsDTO save(PaymentsDTO paymentsDTO);

    /**
     * Get all the payments.
     *
     * @return the list of entities.
     */
    List<PaymentsDTO> findAll();


    /**
     * Get the "id" payments.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PaymentsDTO> findOne(Long id);

    /**
     * Delete the "id" payments.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
