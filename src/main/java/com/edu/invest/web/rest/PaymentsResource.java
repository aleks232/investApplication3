package com.edu.invest.web.rest;

import com.edu.invest.service.PaymentsService;
import com.edu.invest.web.rest.errors.BadRequestAlertException;
import com.edu.invest.service.dto.PaymentsDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.edu.invest.domain.Payments}.
 */
@RestController
@RequestMapping("/api")
public class PaymentsResource {

    private final Logger log = LoggerFactory.getLogger(PaymentsResource.class);

    private static final String ENTITY_NAME = "payments";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaymentsService paymentsService;

    public PaymentsResource(PaymentsService paymentsService) {
        this.paymentsService = paymentsService;
    }

    /**
     * {@code POST  /payments} : Create a new payments.
     *
     * @param paymentsDTO the paymentsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paymentsDTO, or with status {@code 400 (Bad Request)} if the payments has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/payments")
    public ResponseEntity<PaymentsDTO> createPayments(@RequestBody PaymentsDTO paymentsDTO) throws URISyntaxException {
        log.debug("REST request to save Payments : {}", paymentsDTO);
        if (paymentsDTO.getId() != null) {
            throw new BadRequestAlertException("A new payments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentsDTO result = paymentsService.save(paymentsDTO);
        return ResponseEntity.created(new URI("/api/payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /payments} : Updates an existing payments.
     *
     * @param paymentsDTO the paymentsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentsDTO,
     * or with status {@code 400 (Bad Request)} if the paymentsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paymentsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/payments")
    public ResponseEntity<PaymentsDTO> updatePayments(@RequestBody PaymentsDTO paymentsDTO) throws URISyntaxException {
        log.debug("REST request to update Payments : {}", paymentsDTO);
        if (paymentsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaymentsDTO result = paymentsService.save(paymentsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /payments} : get all the payments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of payments in body.
     */
    @GetMapping("/payments")
    public List<PaymentsDTO> getAllPayments() {
        log.debug("REST request to get all Payments");
        return paymentsService.findAll();
    }

    /**
     * {@code GET  /payments/:id} : get the "id" payments.
     *
     * @param id the id of the paymentsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paymentsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payments/{id}")
    public ResponseEntity<PaymentsDTO> getPayments(@PathVariable Long id) {
        log.debug("REST request to get Payments : {}", id);
        Optional<PaymentsDTO> paymentsDTO = paymentsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paymentsDTO);
    }

    /**
     * {@code DELETE  /payments/:id} : delete the "id" payments.
     *
     * @param id the id of the paymentsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePayments(@PathVariable Long id) {
        log.debug("REST request to delete Payments : {}", id);
        paymentsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
