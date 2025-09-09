package com.yellow.ordermanageryellow.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Order_Items")
public class Order_Items {
    @DBRef
    private Product productId;
    private double amount;
    private double quantity;
}
