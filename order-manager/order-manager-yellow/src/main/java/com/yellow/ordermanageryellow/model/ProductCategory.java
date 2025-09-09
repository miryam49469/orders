package com.yellow.ordermanageryellow.model;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "ProductCategory")
@SuperBuilder(toBuilder = true)
public class ProductCategory {
    @Id
    private String id;
    private String name;
    private String desc;
    @DBRef
    private Company companyId;
    private AuditData auditData;
}