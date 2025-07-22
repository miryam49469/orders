package com.yellow.ordermanageryellow.Dto;

import com.yellow.ordermanageryellow.model.Company;
import com.yellow.ordermanageryellow.model.Discount;
import com.yellow.ordermanageryellow.model.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@AllArgsConstructor
@NoArgsConstructor


public class ProductDiscauntDTO {
    private String id;
    private String name;
    private double price;
    private Discount discount;
    private  int discountAmount;
}
