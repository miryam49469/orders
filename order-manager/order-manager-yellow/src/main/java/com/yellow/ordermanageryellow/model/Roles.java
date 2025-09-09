package com.yellow.ordermanageryellow.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;



@Data
@Collation
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Roles")
@SuperBuilder(toBuilder = true)
public class Roles {
    @Id
    private String id;
    private RoleName name;
    private String desc;
    private AuditData auditData;



}

