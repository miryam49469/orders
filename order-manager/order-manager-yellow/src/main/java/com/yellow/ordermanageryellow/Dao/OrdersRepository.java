package com.yellow.ordermanageryellow.Dao;

import com.yellow.ordermanageryellow.model.Orders;
import com.yellow.ordermanageryellow.model.Orders.status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;


public interface OrdersRepository extends MongoRepository<Orders, String> {
    public List<Orders> findByOrderStatusIdInAndCompanyId(Pageable pageNumber, List <String> orderStatusId,String companyId  );


}
