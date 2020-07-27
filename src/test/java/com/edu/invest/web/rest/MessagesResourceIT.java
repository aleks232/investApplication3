package com.edu.invest.web.rest;

import com.edu.invest.InvestApplication3App;
import com.edu.invest.domain.Messages;
import com.edu.invest.repository.MessagesRepository;
import com.edu.invest.service.MessagesService;
import com.edu.invest.service.dto.MessagesDTO;
import com.edu.invest.service.mapper.MessagesMapper;

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

import com.edu.invest.domain.enumeration.NotificationType;
/**
 * Integration tests for the {@link MessagesResource} REST controller.
 */
@SpringBootTest(classes = InvestApplication3App.class)
@AutoConfigureMockMvc
@WithMockUser
public class MessagesResourceIT {

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final NotificationType DEFAULT_NOTIFICATION_TYPE = NotificationType.EMAIL;
    private static final NotificationType UPDATED_NOTIFICATION_TYPE = NotificationType.TELEGRAM;

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CONFIRM_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CONFIRM_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    @Autowired
    private MessagesRepository messagesRepository;

    @Autowired
    private MessagesMapper messagesMapper;

    @Autowired
    private MessagesService messagesService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMessagesMockMvc;

    private Messages messages;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Messages createEntity(EntityManager em) {
        Messages messages = new Messages()
            .message(DEFAULT_MESSAGE)
            .notificationType(DEFAULT_NOTIFICATION_TYPE)
            .createDate(DEFAULT_CREATE_DATE)
            .confirmDate(DEFAULT_CONFIRM_DATE)
            .employeeId(DEFAULT_EMPLOYEE_ID);
        return messages;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Messages createUpdatedEntity(EntityManager em) {
        Messages messages = new Messages()
            .message(UPDATED_MESSAGE)
            .notificationType(UPDATED_NOTIFICATION_TYPE)
            .createDate(UPDATED_CREATE_DATE)
            .confirmDate(UPDATED_CONFIRM_DATE)
            .employeeId(UPDATED_EMPLOYEE_ID);
        return messages;
    }

    @BeforeEach
    public void initTest() {
        messages = createEntity(em);
    }

    @Test
    @Transactional
    public void createMessages() throws Exception {
        int databaseSizeBeforeCreate = messagesRepository.findAll().size();
        // Create the Messages
        MessagesDTO messagesDTO = messagesMapper.toDto(messages);
        restMessagesMockMvc.perform(post("/api/messages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(messagesDTO)))
            .andExpect(status().isCreated());

        // Validate the Messages in the database
        List<Messages> messagesList = messagesRepository.findAll();
        assertThat(messagesList).hasSize(databaseSizeBeforeCreate + 1);
        Messages testMessages = messagesList.get(messagesList.size() - 1);
        assertThat(testMessages.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testMessages.getNotificationType()).isEqualTo(DEFAULT_NOTIFICATION_TYPE);
        assertThat(testMessages.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testMessages.getConfirmDate()).isEqualTo(DEFAULT_CONFIRM_DATE);
        assertThat(testMessages.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    public void createMessagesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = messagesRepository.findAll().size();

        // Create the Messages with an existing ID
        messages.setId(1L);
        MessagesDTO messagesDTO = messagesMapper.toDto(messages);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessagesMockMvc.perform(post("/api/messages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(messagesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Messages in the database
        List<Messages> messagesList = messagesRepository.findAll();
        assertThat(messagesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMessages() throws Exception {
        // Initialize the database
        messagesRepository.saveAndFlush(messages);

        // Get all the messagesList
        restMessagesMockMvc.perform(get("/api/messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messages.getId().intValue())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)))
            .andExpect(jsonPath("$.[*].notificationType").value(hasItem(DEFAULT_NOTIFICATION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].confirmDate").value(hasItem(DEFAULT_CONFIRM_DATE.toString())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getMessages() throws Exception {
        // Initialize the database
        messagesRepository.saveAndFlush(messages);

        // Get the messages
        restMessagesMockMvc.perform(get("/api/messages/{id}", messages.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(messages.getId().intValue()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE))
            .andExpect(jsonPath("$.notificationType").value(DEFAULT_NOTIFICATION_TYPE.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.confirmDate").value(DEFAULT_CONFIRM_DATE.toString()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMessages() throws Exception {
        // Get the messages
        restMessagesMockMvc.perform(get("/api/messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMessages() throws Exception {
        // Initialize the database
        messagesRepository.saveAndFlush(messages);

        int databaseSizeBeforeUpdate = messagesRepository.findAll().size();

        // Update the messages
        Messages updatedMessages = messagesRepository.findById(messages.getId()).get();
        // Disconnect from session so that the updates on updatedMessages are not directly saved in db
        em.detach(updatedMessages);
        updatedMessages
            .message(UPDATED_MESSAGE)
            .notificationType(UPDATED_NOTIFICATION_TYPE)
            .createDate(UPDATED_CREATE_DATE)
            .confirmDate(UPDATED_CONFIRM_DATE)
            .employeeId(UPDATED_EMPLOYEE_ID);
        MessagesDTO messagesDTO = messagesMapper.toDto(updatedMessages);

        restMessagesMockMvc.perform(put("/api/messages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(messagesDTO)))
            .andExpect(status().isOk());

        // Validate the Messages in the database
        List<Messages> messagesList = messagesRepository.findAll();
        assertThat(messagesList).hasSize(databaseSizeBeforeUpdate);
        Messages testMessages = messagesList.get(messagesList.size() - 1);
        assertThat(testMessages.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testMessages.getNotificationType()).isEqualTo(UPDATED_NOTIFICATION_TYPE);
        assertThat(testMessages.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testMessages.getConfirmDate()).isEqualTo(UPDATED_CONFIRM_DATE);
        assertThat(testMessages.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingMessages() throws Exception {
        int databaseSizeBeforeUpdate = messagesRepository.findAll().size();

        // Create the Messages
        MessagesDTO messagesDTO = messagesMapper.toDto(messages);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessagesMockMvc.perform(put("/api/messages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(messagesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Messages in the database
        List<Messages> messagesList = messagesRepository.findAll();
        assertThat(messagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMessages() throws Exception {
        // Initialize the database
        messagesRepository.saveAndFlush(messages);

        int databaseSizeBeforeDelete = messagesRepository.findAll().size();

        // Delete the messages
        restMessagesMockMvc.perform(delete("/api/messages/{id}", messages.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Messages> messagesList = messagesRepository.findAll();
        assertThat(messagesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
