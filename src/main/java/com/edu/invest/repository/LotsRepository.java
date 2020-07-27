package com.edu.invest.repository;

import com.edu.invest.domain.Lots;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Lots entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LotsRepository extends JpaRepository<Lots, Long> {
}
