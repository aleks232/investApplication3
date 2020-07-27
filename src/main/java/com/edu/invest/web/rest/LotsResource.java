package com.edu.invest.web.rest;

import com.edu.invest.service.LotsService;
import com.edu.invest.web.rest.errors.BadRequestAlertException;
import com.edu.invest.service.dto.LotsDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.edu.invest.domain.Lots}.
 */
@RestController
@RequestMapping("/api")
public class LotsResource {

    private final Logger log = LoggerFactory.getLogger(LotsResource.class);

    private static final String ENTITY_NAME = "lots";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LotsService lotsService;

    public LotsResource(LotsService lotsService) {
        this.lotsService = lotsService;
    }

    /**
     * {@code POST  /lots} : Create a new lots.
     *
     * @param lotsDTO the lotsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lotsDTO, or with status {@code 400 (Bad Request)} if the lots has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lots")
    public ResponseEntity<LotsDTO> createLots(@RequestBody LotsDTO lotsDTO) throws URISyntaxException {
        log.debug("REST request to save Lots : {}", lotsDTO);
        if (lotsDTO.getId() != null) {
            throw new BadRequestAlertException("A new lots cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LotsDTO result = lotsService.save(lotsDTO);
        return ResponseEntity.created(new URI("/api/lots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lots} : Updates an existing lots.
     *
     * @param lotsDTO the lotsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lotsDTO,
     * or with status {@code 400 (Bad Request)} if the lotsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lotsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lots")
    public ResponseEntity<LotsDTO> updateLots(@RequestBody LotsDTO lotsDTO) throws URISyntaxException {
        log.debug("REST request to update Lots : {}", lotsDTO);
        if (lotsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LotsDTO result = lotsService.save(lotsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lotsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /lots} : get all the lots.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lots in body.
     */
    @GetMapping("/lots")
    public ResponseEntity<List<LotsDTO>> getAllLots(Pageable pageable) {
        log.debug("REST request to get a page of Lots");
        Page<LotsDTO> page = lotsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lots/:id} : get the "id" lots.
     *
     * @param id the id of the lotsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lotsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lots/{id}")
    public ResponseEntity<LotsDTO> getLots(@PathVariable Long id) {
        log.debug("REST request to get Lots : {}", id);
        Optional<LotsDTO> lotsDTO = lotsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lotsDTO);
    }

    /**
     * {@code DELETE  /lots/:id} : delete the "id" lots.
     *
     * @param id the id of the lotsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lots/{id}")
    public ResponseEntity<Void> deleteLots(@PathVariable Long id) {
        log.debug("REST request to delete Lots : {}", id);
        lotsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
