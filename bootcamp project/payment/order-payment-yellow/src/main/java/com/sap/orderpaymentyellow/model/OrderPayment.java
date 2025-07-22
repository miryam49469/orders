package com.sap.orderpaymentyellow.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "OrderPayment")
@SuperBuilder(toBuilder = true)
public class OrderPayment {
    @Id
    private String Id;
    private String orderId;
    private String userId;
    private double amount;
    private String invoiceNumber;
    private PaymentType paymentType;
    private long creditCardNumber;
    private String expiryOn;
    private String cvc;
    private AuditData auditData;

    public OrderPayment(String orderId, String customerId, double paymentAmount, PaymentType paymentType, long creditCardNumber, String cvc, String expiryOn, AuditData auditData) {
        this.orderId = orderId;
        this.userId = customerId;
        this.amount = paymentAmount;
        this.paymentType = paymentType;
        this.creditCardNumber = creditCardNumber;
        this.cvc = cvc;
        this.expiryOn = expiryOn;
        this.auditData = auditData;
    }

    public enum PaymentType {CREDIT,DEBIT}
}
