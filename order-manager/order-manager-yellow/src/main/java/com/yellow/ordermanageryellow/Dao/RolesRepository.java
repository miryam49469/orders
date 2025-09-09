package com.yellow.ordermanageryellow.Dao;

import com.yellow.ordermanageryellow.model.RoleName;
import com.yellow.ordermanageryellow.model.Roles;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends MongoRepository<Roles, String> {
    Roles getByName(RoleName name);
}
