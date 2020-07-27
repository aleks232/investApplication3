package com.edu.invest.web.rest;

import com.edu.invest.service.PackagesService;
import com.edu.invest.web.rest.errors.BadRequestAlertException;
import com.edu.invest.service.dto.PackagesDTO;

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
 * REST controller for managing {@link com.edu.invest.domain.Packages}.
 */
@RestController
@RequestMapping("/api")
public class PackagesResource {

    private final Logger log = LoggerFactory.getLogger(PackagesResource.class);

    private static final String ENTITY_NAME = "packages";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PackagesService packagesService;

    public PackagesResource(PackagesService packagesService) {
        this.packagesService = packagesService;
    }

    /**
     * {@code POST  /packages} : Create a new packages.
     *
     * @param packagesDTO the packagesDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new packagesDTO, or with status {@code 400 (Bad Request)} if the packages has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/packages")
    public ResponseEntity<PackagesDTO> createPackages(@RequestBody PackagesDTO packagesDTO) throws URISyntaxException {
        log.debug("REST request to save Packages : {}", packagesDTO);
        if (packagesDTO.getId() != null) {
            throw new BadRequestAlertException("A new packages cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PackagesDTO result = packagesService.save(packagesDTO);
        return ResponseEntity.created(new URI("/api/packages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /packages} : Updates an existing packages.
     *
     * @param packagesDTO the packagesDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated packagesDTO,
     * or with status {@code 400 (Bad Request)} if the packagesDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the packagesDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/packages")
    public ResponseEntity<PackagesDTO> updatePackages(@RequestBody PackagesDTO packagesDTO) throws URISyntaxException {
        log.debug("REST request to update Packages : {}", packagesDTO);
        if (packagesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PackagesDTO result = packagesService.save(packagesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, packagesDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /packages} : get all the packages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of packages in body.
     */
    @GetMapping("/packages")
    public List<PackagesDTO> getAllPackages() {
        log.debug("REST request to get all Packages");
        return packagesService.findAll();
    }

    /**
     * {@code GET  /packages/:id} : get the "id" packages.
     *
     * @param id the id of the packagesDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the packagesDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/packages/{id}")
    public ResponseEntity<PackagesDTO> getPackages(@PathVariable Long id) {
        log.debug("REST request to get Packages : {}", id);
        Optional<PackagesDTO> packagesDTO = packagesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(packagesDTO);
    }

    /**
     * {@code DELETE  /packages/:id} : delete the "id" packages.
     *
     * @param id the id of the packagesDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/packages/{id}")
    public ResponseEntity<Void> deletePackages(@PathVariable Long id) {
        log.debug("REST request to delete Packages : {}", id);
        packagesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
