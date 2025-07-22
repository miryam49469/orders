package com.yellow.ordermanageryellow.Dto;

import com.yellow.ordermanageryellow.model.Address;
import lombok.*;
import org.springframework.context.annotation.Bean;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private String id ;
    private String fullName;
    private String address;
    private String email;
    private String telephone;
    private String password;
    private String role;



}
