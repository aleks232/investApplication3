package com.edu.invest.web.rest;

import com.edu.invest.InvestApplication3App;
import com.edu.invest.domain.Lots;
import com.edu.invest.repository.LotsRepository;
import com.edu.invest.service.LotsService;
import com.edu.invest.service.dto.LotsDTO;
import com.edu.invest.service.mapper.LotsMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LotsResource} REST controller.
 */
@SpringBootTest(classes = InvestApplication3App.class)
@AutoConfigureMockMvc
@WithMockUser
public class LotsResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_MIN_PRICE = 1L;
    private static final Long UPDATED_MIN_PRICE = 2L;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private LotsRepository lotsRepository;

    @Autowired
    private LotsMapper lotsMapper;

    @Autowired
    private LotsService lotsService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLotsMockMvc;

    private Lots lots;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lots createEntity(EntityManager em) {
        Lots lots = new Lots()
            .description(DEFAULT_DESCRIPTION)
            .minPrice(DEFAULT_MIN_PRICE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return lots;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lots createUpdatedEntity(EntityManager em) {
        Lots lots = new Lots()
            .description(UPDATED_DESCRIPTION)
            .minPrice(UPDATED_MIN_PRICE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return lots;
    }

    @BeforeEach
    public void initTest() {
        lots = createEntity(em);
    }

    @Test
    @Transactional
    public void createLots() throws Exception {
        int databaseSizeBeforeCreate = lotsRepository.findAll().size();
        // Create the Lots
        LotsDTO lotsDTO = lotsMapper.toDto(lots);
        restLotsMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lotsDTO)))
            .andExpect(status().isCreated());

        // Validate the Lots in the database
        List<Lots> lotsList = lotsRepository.findAll();
        assertThat(lotsList).hasSize(databaseSizeBeforeCreate + 1);
        Lots testLots = lotsList.get(lotsList.size() - 1);
        assertThat(testLots.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLots.getMinPrice()).isEqualTo(DEFAULT_MIN_PRICE);
        assertThat(testLots.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testLots.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createLotsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lotsRepository.findAll().size();

        // Create the Lots with an existing ID
        lots.setId(1L);
        LotsDTO lotsDTO = lotsMapper.toDto(lots);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLotsMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lotsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lots in the database
        List<Lots> lotsList = lotsRepository.findAll();
        assertThat(lotsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLots() throws Exception {
        // Initialize the database
        lotsRepository.saveAndFlush(lots);

        // Get all the lotsList
        restLotsMockMvc.perform(get("/api/lots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lots.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].minPrice").value(hasItem(DEFAULT_MIN_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getLots() throws Exception {
        // Initialize the database
        lotsRepository.saveAndFlush(lots);

        // Get the lots
        restLotsMockMvc.perform(get("/api/lots/{id}", lots.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lots.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.minPrice").value(DEFAULT_MIN_PRICE.intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLots() throws Exception {
        // Get the lots
        restLotsMockMvc.perform(get("/api/lots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLots() throws Exception {
        // Initialize the database
        lotsRepository.saveAndFlush(lots);

        int databaseSizeBeforeUpdate = lotsRepository.findAll().size();

        // Update the lots
        Lots updatedLots = lotsRepository.findById(lots.getId()).get();
        // Disconnect from session so that the updates on updatedLots are not directly saved in db
        em.detach(updatedLots);
        updatedLots
            .description(UPDATED_DESCRIPTION)
            .minPrice(UPDATED_MIN_PRICE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        LotsDTO lotsDTO = lotsMapper.toDto(updatedLots);

        restLotsMockMvc.perform(put("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lotsDTO)))
            .andExpect(status().isOk());

        // Validate the Lots in the database
        List<Lots> lotsList = lotsRepository.findAll();
        assertThat(lotsList).hasSize(databaseSizeBeforeUpdate);
        Lots testLots = lotsList.get(lotsList.size() - 1);
        assertThat(testLots.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLots.getMinPrice()).isEqualTo(UPDATED_MIN_PRICE);
        assertThat(testLots.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testLots.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingLots() throws Exception {
        int databaseSizeBeforeUpdate = lotsRepository.findAll().size();

        // Create the Lots
        LotsDTO lotsDTO = lotsMapper.toDto(lots);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLotsMockMvc.perform(put("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lotsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lots in the database
        List<Lots> lotsList = lotsRepository.findAll();
        assertThat(lotsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLots() throws Exception {
        // Initialize the database
        lotsRepository.saveAndFlush(lots);

        int databaseSizeBeforeDelete = lotsRepository.findAll().size();

        // Delete the lots
        restLotsMockMvc.perform(delete("/api/lots/{id}", lots.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Lots> lotsList = lotsRepository.findAll();
        assertThat(lotsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
