package com.edu.invest.service.impl;

import com.edu.invest.domain.Documents;
import com.edu.invest.domain.Lots;
import com.edu.invest.domain.Orders;
import com.edu.invest.domain.enumeration.OrderStatus;
import com.edu.invest.repository.DocumentsRepository;
import com.edu.invest.repository.OrdersRepository;
import com.edu.invest.service.DocumentsService;
import com.edu.invest.service.dto.DocumentsDTO;
import com.edu.invest.service.mapper.DocumentsMapper;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Documents}.
 */
@Service
@Transactional
public class DocumentsServiceImpl implements DocumentsService {
    private final Logger log = LoggerFactory.getLogger(DocumentsServiceImpl.class);

    private final DocumentsRepository documentsRepository;

    private final DocumentsMapper documentsMapper;

    private final OrdersRepository ordersRepository;

    public DocumentsServiceImpl(
        DocumentsRepository documentsRepository,
        DocumentsMapper documentsMapper,
        OrdersRepository ordersRepository
    ) {
        this.documentsRepository = documentsRepository;
        this.documentsMapper = documentsMapper;
        this.ordersRepository = ordersRepository;
    }

    @Override
    public DocumentsDTO save(DocumentsDTO documentsDTO) {
        log.debug("Request to save Documents : {}", documentsDTO);
        Documents documents = documentsMapper.toEntity(documentsDTO);
        documents = documentsRepository.save(documents);
        return documentsMapper.toDto(documents);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentsDTO> findAll() {
        log.debug("Request to get all Documents");
        return documentsRepository.findAll().stream().map(documentsMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<DocumentsDTO> findDocuments(Long orderId) {
        log.debug("Request to get find Documents");
        Optional<Orders> order = ordersRepository.findById(orderId);
        if (order.isPresent()) {
            return documentsRepository
                .findByOrder(order.get())
                .stream()
                .map(documentsMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
        }

        return Collections.EMPTY_LIST;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DocumentsDTO> findOne(Long id) {
        log.debug("Request to get Documents : {}", id);
        return documentsRepository.findById(id).map(documentsMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Documents : {}", id);
        documentsRepository.deleteById(id);
    }
}
