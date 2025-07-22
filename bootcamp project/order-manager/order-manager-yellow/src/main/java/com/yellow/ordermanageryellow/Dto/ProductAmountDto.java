package com.yellow.ordermanageryellow.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductAmountDto {
    private String productName;
    private double amount;
}
