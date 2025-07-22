package com.yellow.ordermanageryellow.Dto;

import com.yellow.ordermanageryellow.model.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String orderId ;
    private String customerId ;
    private int paymentAmount;
    private Orders.status orderStatusId;
    private long creditCardNumber;
    private String expiryOn;
    private String cvc;

    private PaymentType paymentType;


    public enum PaymentType {
        CREDIT,
        DEBIT
    }

//    public String toJson() {
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
//
//        try {
//            return objectMapper.writeValueAsString(this);
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return null;
//    }
}
