package com.yellow.ordermanageryellow.Dto;

import com.yellow.ordermanageryellow.model.Users;
import com.yellow.ordermanageryellow.Dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {
 UserMapper INSTANCE= Mappers.getMapper(UserMapper.class);

 @Mapping(source = "address.email", target = "email")
 @Mapping(source = "address.telephone", target = "telephone")
 @Mapping(source = "address.address", target = "address")
 @Mapping(source = "roleId.name", target = "role")

 UserDTO usersToUserDTO(Users entity);


}
