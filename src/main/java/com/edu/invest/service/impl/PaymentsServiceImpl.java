package com.edu.invest.service.impl;

import com.edu.invest.service.PaymentsService;
import com.edu.invest.domain.Payments;
import com.edu.invest.repository.PaymentsRepository;
import com.edu.invest.service.dto.PaymentsDTO;
import com.edu.invest.service.mapper.PaymentsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Payments}.
 */
@Service
@Transactional
public class PaymentsServiceImpl implements PaymentsService {

    private final Logger log = LoggerFactory.getLogger(PaymentsServiceImpl.class);

    private final PaymentsRepository paymentsRepository;

    private final PaymentsMapper paymentsMapper;

    public PaymentsServiceImpl(PaymentsRepository paymentsRepository, PaymentsMapper paymentsMapper) {
        this.paymentsRepository = paymentsRepository;
        this.paymentsMapper = paymentsMapper;
    }

    @Override
    public PaymentsDTO save(PaymentsDTO paymentsDTO) {
        log.debug("Request to save Payments : {}", paymentsDTO);
        Payments payments = paymentsMapper.toEntity(paymentsDTO);
        payments = paymentsRepository.save(payments);
        return paymentsMapper.toDto(payments);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentsDTO> findAll() {
        log.debug("Request to get all Payments");
        return paymentsRepository.findAll().stream()
            .map(paymentsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PaymentsDTO> findOne(Long id) {
        log.debug("Request to get Payments : {}", id);
        return paymentsRepository.findById(id)
            .map(paymentsMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Payments : {}", id);
        paymentsRepository.deleteById(id);
    }
}
