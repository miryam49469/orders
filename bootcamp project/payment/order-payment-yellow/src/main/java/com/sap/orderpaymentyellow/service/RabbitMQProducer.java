package com.sap.orderpaymentyellow.service;

import com.sap.orderpaymentyellow.Dto.OrderDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQProducer {
    @Value("${rabbitmq.exchange.producer.name}")
    private String exchange;
    @Value("${rabbitmq.routing.producer.key}")
    private String routingKey;
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQProducer.class);
    @Autowired
    private RabbitTemplate rabbitTemplate;


    public void sendMessage(OrderDTO o) {
        LOGGER.info(String.format("message sent -> %s ", o.toString()));
        rabbitTemplate.convertAndSend(exchange, routingKey, o);
    }
}