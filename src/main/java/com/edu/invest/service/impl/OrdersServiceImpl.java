package com.edu.invest.service.impl;

import com.edu.invest.domain.Lots;
import com.edu.invest.domain.Orders;
import com.edu.invest.domain.enumeration.OrderStatus;
import com.edu.invest.repository.LotsRepository;
import com.edu.invest.repository.OrdersRepository;
import com.edu.invest.service.OrdersService;
import com.edu.invest.service.dto.OrdersDTO;
import com.edu.invest.service.mapper.OrdersMapper;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Orders}.
 */
@Service
@Transactional
public class OrdersServiceImpl implements OrdersService {
    private final Logger log = LoggerFactory.getLogger(OrdersServiceImpl.class);

    private final OrdersRepository ordersRepository;

    private final OrdersMapper ordersMapper;

    private final LotsRepository lotsRepository;

    public OrdersServiceImpl(OrdersRepository ordersRepository, OrdersMapper ordersMapper, LotsRepository lotsRepository) {
        this.ordersRepository = ordersRepository;
        this.ordersMapper = ordersMapper;
        this.lotsRepository = lotsRepository;
    }

    @Override
    public OrdersDTO save(OrdersDTO ordersDTO) {
        log.debug("Request to save Orders : {}", ordersDTO);
        Orders orders = ordersMapper.toEntity(ordersDTO);
        orders = ordersRepository.save(orders);
        return ordersMapper.toDto(orders);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrdersDTO> findAll() {
        log.debug("Request to get all Orders");
        return ordersRepository.findAll().stream().map(ordersMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<OrdersDTO> findOrders(Long lotId, String orderStatus) {
        log.debug("Request to get all Orders");

        Optional<Lots> lot = lotsRepository.findById(lotId);
        if (lot.isPresent()) {
            if (StringUtils.isNotEmpty(orderStatus)) {
                return ordersRepository
                    .findByLotAndOrderStatus(lot.get(), OrderStatus.valueOf(orderStatus))
                    .stream()
                    .map(ordersMapper::toDto)
                    .collect(Collectors.toCollection(LinkedList::new));
            }
            return ordersRepository
                .findByLot(lot.get())
                .stream()
                .map(ordersMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
        }

        return Collections.EMPTY_LIST;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrdersDTO> findOne(Long id) {
        log.debug("Request to get Orders : {}", id);
        return ordersRepository.findById(id).map(ordersMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Orders : {}", id);
        ordersRepository.deleteById(id);
    }
}
