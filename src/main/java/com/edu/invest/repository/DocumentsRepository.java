package com.edu.invest.repository;

import com.edu.invest.domain.Documents;
import com.edu.invest.domain.Orders;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Documents entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentsRepository extends JpaRepository<Documents, Long> {
    List<Documents> findByOrder(Orders order);
}
