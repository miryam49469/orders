package com.sap.orderpaymentyellow.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendPaymentDTO implements Serializable {
    private int paymentAmount;
    private long creditCardNumber;
    private String expiryOn;
    private String cvc;

    public enum status {New, cancelled, approved, charging, packing, delivered}
}