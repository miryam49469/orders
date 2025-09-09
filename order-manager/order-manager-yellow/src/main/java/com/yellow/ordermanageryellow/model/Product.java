package com.yellow.ordermanageryellow.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;


@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Product")

public class Product {
    @Id
    private String id;
    private String name;
    private String desc;
    private double price;
    private Discount discount;
    private int discountAmount;
    @DBRef
    private ProductCategory productCategoryId;
    private int inventory;
    @DBRef
    private Company companyId;
    private AuditData auditData;

    public Product(LocalDateTime date) {
        this.auditData =  new AuditData(this.auditData.getCreateDate(),date);
    }
}
