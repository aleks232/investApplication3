package com.edu.invest.service.impl;

import com.edu.invest.service.PackagesService;
import com.edu.invest.domain.Packages;
import com.edu.invest.repository.PackagesRepository;
import com.edu.invest.service.dto.PackagesDTO;
import com.edu.invest.service.mapper.PackagesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Packages}.
 */
@Service
@Transactional
public class PackagesServiceImpl implements PackagesService {

    private final Logger log = LoggerFactory.getLogger(PackagesServiceImpl.class);

    private final PackagesRepository packagesRepository;

    private final PackagesMapper packagesMapper;

    public PackagesServiceImpl(PackagesRepository packagesRepository, PackagesMapper packagesMapper) {
        this.packagesRepository = packagesRepository;
        this.packagesMapper = packagesMapper;
    }

    @Override
    public PackagesDTO save(PackagesDTO packagesDTO) {
        log.debug("Request to save Packages : {}", packagesDTO);
        Packages packages = packagesMapper.toEntity(packagesDTO);
        packages = packagesRepository.save(packages);
        return packagesMapper.toDto(packages);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PackagesDTO> findAll() {
        log.debug("Request to get all Packages");
        return packagesRepository.findAll().stream()
            .map(packagesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PackagesDTO> findOne(Long id) {
        log.debug("Request to get Packages : {}", id);
        return packagesRepository.findById(id)
            .map(packagesMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Packages : {}", id);
        packagesRepository.deleteById(id);
    }
}
