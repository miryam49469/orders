package com.yellow.ordermanageryellow.Dao;
import com.yellow.ordermanageryellow.model.Product;
import com.yellow.ordermanageryellow.model.ProductCategory;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ProductCategoryRepository extends MongoRepository<ProductCategory, String> {
    boolean existsByname(String name);
    List<ProductCategory> findByCompanyIdId(String companyId);
    Page<ProductCategory> findByCompanyIdId(String companyId, Pageable pageable);
}