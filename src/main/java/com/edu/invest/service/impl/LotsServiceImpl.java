package com.edu.invest.service.impl;

import com.edu.invest.service.LotsService;
import com.edu.invest.domain.Lots;
import com.edu.invest.repository.LotsRepository;
import com.edu.invest.service.dto.LotsDTO;
import com.edu.invest.service.mapper.LotsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Lots}.
 */
@Service
@Transactional
public class LotsServiceImpl implements LotsService {

    private final Logger log = LoggerFactory.getLogger(LotsServiceImpl.class);

    private final LotsRepository lotsRepository;

    private final LotsMapper lotsMapper;

    public LotsServiceImpl(LotsRepository lotsRepository, LotsMapper lotsMapper) {
        this.lotsRepository = lotsRepository;
        this.lotsMapper = lotsMapper;
    }

    @Override
    public LotsDTO save(LotsDTO lotsDTO) {
        log.debug("Request to save Lots : {}", lotsDTO);
        Lots lots = lotsMapper.toEntity(lotsDTO);
        lots = lotsRepository.save(lots);
        return lotsMapper.toDto(lots);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LotsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Lots");
        return lotsRepository.findAll(pageable)
            .map(lotsMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<LotsDTO> findOne(Long id) {
        log.debug("Request to get Lots : {}", id);
        return lotsRepository.findById(id)
            .map(lotsMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Lots : {}", id);
        lotsRepository.deleteById(id);
    }
}
