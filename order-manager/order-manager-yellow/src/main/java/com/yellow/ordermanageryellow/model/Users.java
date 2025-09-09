package com.yellow.ordermanageryellow.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Users")
public class Users{

@Id
private String id;
private String fullName;
private String password;
private Address address;
@DBRef
private Roles roleId;
@DBRef
private Company companyId;
private AuditData AuditData;
public Users(String id) {
        this.id = id;
    }
}
