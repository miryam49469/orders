package com.yellow.ordermanageryellow.service;

import com.yellow.ordermanageryellow.Dao.OrdersRepository;
import com.yellow.ordermanageryellow.Dao.ProductRepository;
import com.yellow.ordermanageryellow.Dto.OrderDTO;
import com.yellow.ordermanageryellow.Dto.OrderMapper;
import com.yellow.ordermanageryellow.model.Order_Items;
import com.yellow.ordermanageryellow.model.Orders;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChargingService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    public void chargingStep(Orders order) {
        Orders orderFromMongo = ordersRepository.findById(order.getId()).orElse(null);
        try {
            orderFromMongo.setOrderStatusId(Orders.status.Charging);
            for (Order_Items item : orderFromMongo.getOrderItems()) {
                if (item.getProductId().getInventory() < item.getQuantity()) {
                    orderFromMongo.setOrderStatusId(Orders.status.Cancelled);
                    ordersRepository.save(orderFromMongo);
                    return;
                } else {
                    item.getProductId().setInventory((int) (item.getProductId().getInventory() - item.getQuantity()));
                    productRepository.save(item.getProductId());
                }
            }
            OrderDTO orderDTO = OrderMapper.INSTANCE.orderToOrderDTO(orderFromMongo);
            rabbitMQProducer.sendMessage(orderDTO);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
    public void CompletedPayment(@NotNull OrderDTO orderDTO) {
        Orders order=ordersRepository.findById(orderDTO.getOrderId()).orElse(null);
        if(orderDTO.getOrderStatusId()==Orders.status.Charging)
            order.setOrderStatusId(Orders.status.Packing);
        else {
            order.setOrderStatusId(Orders.status.Cancelled);
            for (Order_Items item:order.getOrderItems()){
                item.getProductId().setInventory((int)(item.getProductId().getInventory()+item.getQuantity()));
                 productRepository.save(item.getProductId());}
                }
                ordersRepository.save(order);
            }
        }
