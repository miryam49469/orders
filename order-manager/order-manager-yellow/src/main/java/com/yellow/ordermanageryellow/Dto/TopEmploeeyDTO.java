package com.yellow.ordermanageryellow.Dto;


import com.yellow.ordermanageryellow.model.Users;

import java.io.Serializable;

import com.yellow.ordermanageryellow.model.Users;
import lombok.*;
import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TopEmploeeyDTO implements Serializable {
    private Users employee;
    private int countOfDeliveredOrders;
}
