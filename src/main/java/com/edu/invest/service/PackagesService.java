package com.edu.invest.service;

import com.edu.invest.service.dto.PackagesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.edu.invest.domain.Packages}.
 */
public interface PackagesService {

    /**
     * Save a packages.
     *
     * @param packagesDTO the entity to save.
     * @return the persisted entity.
     */
    PackagesDTO save(PackagesDTO packagesDTO);

    /**
     * Get all the packages.
     *
     * @return the list of entities.
     */
    List<PackagesDTO> findAll();


    /**
     * Get the "id" packages.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PackagesDTO> findOne(Long id);

    /**
     * Delete the "id" packages.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
