package com.sap.orderpaymentyellow.service;

import com.sap.orderpaymentyellow.Dao.PaymentRepository;
import com.sap.orderpaymentyellow.Dto.OrderDTO;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sap.orderpaymentyellow.model.AuditData;
import com.sap.orderpaymentyellow.model.OrderPayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;

@Service
public class PaymentProcessingService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    public void PaymentProcessing(OrderDTO order) {
        String mockServerUrl = "https://ee090a54-1b33-434b-be5e-82c30d14b367.mock.pstmn.io/payment?paymentAmount=" + order.getPaymentAmount() + "&creditCardNumber=" + order.getCreditCardNumber() + "&cvc=" + order.getCvc() + "&expiryDate=" + order.getExpiryOn();
        AuditData auditData = new AuditData(LocalDateTime.now());
        OrderPayment orderPayment = new OrderPayment(order.getOrderId(), order.getCustomerId(), order.getPaymentAmount(),  OrderPayment.PaymentType.DEBIT, order.getCreditCardNumber(),
                order.getCvc(), order.getExpiryOn(), auditData);
        try {
            URL url = new URL(mockServerUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Set request method
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            StringBuilder response = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            reader.close();
            JsonObject jsonResponse = new Gson().fromJson(response.toString(), JsonObject.class);
            String status = jsonResponse.get("status").getAsString();
            if (status.equals("approved")) {
                String invoiceNumber = jsonResponse.get("invoiceNumber").getAsString();
                orderPayment.setInvoiceNumber(invoiceNumber);
                paymentRepository.save(orderPayment);
            } else
                order.setOrderStatusId(OrderDTO.status.cancelled);
            rabbitMQProducer.sendMessage(order);
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
