package com.edu.invest.service;

import com.edu.invest.service.dto.LotsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.edu.invest.domain.Lots}.
 */
public interface LotsService {

    /**
     * Save a lots.
     *
     * @param lotsDTO the entity to save.
     * @return the persisted entity.
     */
    LotsDTO save(LotsDTO lotsDTO);

    /**
     * Get all the lots.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LotsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" lots.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LotsDTO> findOne(Long id);

    /**
     * Delete the "id" lots.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
