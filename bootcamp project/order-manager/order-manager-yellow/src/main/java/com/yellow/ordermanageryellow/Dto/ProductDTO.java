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
public class ProductDTO {
    private String id;
    private String name;
    private String desc;
    private double price;
    private String productCategoryId;
    private int inventory;
    private Discount discount;
    private int discountAmount;


}
