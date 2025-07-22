package com.yellow.ordermanageryellow.Dto;

import com.yellow.ordermanageryellow.Dto.OrderDTO;
import com.yellow.ordermanageryellow.model.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(target = "orderId", source = "id")
    @Mapping(target = "customerId", source = "customer.id")
    @Mapping(target = "paymentAmount", source = "totalAmount")
    @Mapping(target = "orderStatusId", source = "orderStatusId")
    @Mapping(target = "creditCardNumber", source = "creditCardNumber")
    @Mapping(target = "expiryOn", source = "expiryOn")
    @Mapping(target = "cvc", source = "cvc")
    OrderDTO orderToOrderDTO(Orders order);
}

