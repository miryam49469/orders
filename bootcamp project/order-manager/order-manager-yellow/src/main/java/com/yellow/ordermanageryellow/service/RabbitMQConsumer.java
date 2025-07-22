package com.yellow.ordermanageryellow.service;

import com.yellow.ordermanageryellow.Dto.OrderDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RabbitMQConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQConsumer.class);
    @Autowired
    private final ChargingService chargingService=new ChargingService();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @RabbitListener(queues = {"${rabbitmq.queue.consumer.name}"})
    public void consumer(OrderDTO message) {
        try {
            LOGGER.info(String.format("Received message -> %s ", message));
            chargingService.CompletedPayment(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}