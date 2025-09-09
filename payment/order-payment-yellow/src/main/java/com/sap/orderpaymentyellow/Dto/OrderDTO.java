package com.sap.orderpaymentyellow.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String orderId;
    private String customerId;
    private double paymentAmount;
    private status orderStatusId;
    private long creditCardNumber;
    private String expiryOn;
    private String cvc;

    private PaymentType paymentType;


    public enum PaymentType {CREDIT, DEBIT}

    public enum status {New, cancelled, approved, charging, packing, delivered}
}
