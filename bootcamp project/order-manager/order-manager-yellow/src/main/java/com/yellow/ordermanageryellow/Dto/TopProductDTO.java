package com.yellow.ordermanageryellow.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Month;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TopProductDTO
{
    private Month month;
    private List<ProductAmountDto> products;
}
