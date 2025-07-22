package com.sap.orderpaymentyellow.Dao;


import com.sap.orderpaymentyellow.model.OrderPayment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<OrderPayment, String> {

}
