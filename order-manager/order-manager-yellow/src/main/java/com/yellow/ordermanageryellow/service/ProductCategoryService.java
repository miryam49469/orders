package com.yellow.ordermanageryellow.service;

import com.yellow.ordermanageryellow.Dao.CompanyRepository;
import com.yellow.ordermanageryellow.Dao.RolesRepository;
import com.yellow.ordermanageryellow.Dao.UserRepository;
import com.yellow.ordermanageryellow.exceptions.NoPermissionException;
import com.yellow.ordermanageryellow.exceptions.ObjectAlreadyExistException;
import com.yellow.ordermanageryellow.Dao.ProductCategoryRepository;
import com.yellow.ordermanageryellow.model.*;
import com.yellow.ordermanageryellow.security.EncryptedData;
import com.yellow.ordermanageryellow.security.JwtToken;
import lombok.SneakyThrows;
import com.yellow.ordermanageryellow.model.AuditData;


import com.yellow.ordermanageryellow.model.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProductCategoryService {
    @Autowired
    private ProductCategoryRepository productCategoryRepository;
    @Autowired
    private JwtToken jwtToken;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ProductCategory> findAll() {
        return this.productCategoryRepository.findAll();
    }

    public ProductCategory insert(ProductCategory newCategory, String token) throws ObjectAlreadyExistException {
        String role = this.jwtToken.decryptToken(token, EncryptedData.ROLE);
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        Roles wholeRole = rolesRepository.findById(role).orElse(null);
        if (wholeRole == null || !RoleName.ADMIN.equals(wholeRole.getName()))
            throw new NoPermissionException("You do not have permission to delete product category");
        if (this.productCategoryRepository.existsByname(newCategory.getName()))
            throw new ObjectAlreadyExistException("category name already exist");
        Company companyOfUser = new Company();
        companyOfUser.setId(company);
        newCategory.setCompanyId(companyOfUser);
        newCategory.setAuditData(new AuditData(LocalDateTime.now()));
        return this.productCategoryRepository.save(newCategory);
    }

    @SneakyThrows
    public void delete(String token, String categoryId) {
        String role = this.jwtToken.decryptToken(token, EncryptedData.ROLE);
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        ProductCategory categoryFromDb = this.productCategoryRepository.findById(categoryId).orElse(null);
        if (categoryFromDb == null) {
            throw new NoSuchElementException("category is not found");
        }
        String companyOfCategory = categoryFromDb.getCompanyId().getId();
        Roles wholeRole = rolesRepository.findById(role).orElse(null);
        if (!wholeRole.getName().equals(RoleName.ADMIN) || !company.equals(companyOfCategory))
            throw new NoPermissionException("You do not have permission to delete product category");
        this.productCategoryRepository.deleteById(categoryId);
    }

    @SneakyThrows
    public ProductCategory update(String token, ProductCategory updatedCategory) {
        String role = this.jwtToken.decryptToken(token, EncryptedData.ROLE);
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        ProductCategory categoryFromDb = this.productCategoryRepository.findById(updatedCategory.getId()).orElse(null);
        if (categoryFromDb == null) {
            throw new NoSuchElementException("category is not found");
        }
        String companyOfCategory = categoryFromDb.getCompanyId().getId();
        Roles wholeRole = rolesRepository.findById(role).orElse(null);
        if (!wholeRole.getName().equals(RoleName.ADMIN) || company != null && !company.equals(companyOfCategory))
            throw new NoPermissionException("You do not have permission to update product category");
        updatedCategory.setAuditData(new AuditData(categoryFromDb.getAuditData().getCreateDate(), LocalDateTime.now()));
        return this.productCategoryRepository.save(updatedCategory);
    }

    //This function has to be deleted, Just for trying the token
    public String fill() {
        AuditData d = new AuditData(LocalDateTime.now(), LocalDateTime.now());
        Company c = new Company("7", "AAAAAAAAA", Currency.EURO, d);
        companyRepository.save(c);
        Roles roles = new Roles("2", RoleName.ADMIN, "cust", d);
        rolesRepository.save(roles);
        Address a = new Address("3", "058", "Sadigura", "@");
        Users user = new Users("100", "Shlomo", "1000", a, roles, c, d);
        userRepository.save(user);
        ProductCategory productCategory = new ProductCategory("4", "love", "great", c, d);
        productCategoryRepository.save(productCategory);
        ProductCategory productCategory1 = new ProductCategory("90", "Happy", "coffee", c, d);
        productCategoryRepository.save(productCategory1);
        return jwtToken.generateToken(user);
    }
    @SneakyThrows
    public List<ProductCategory> getCategoriesPagination(int pageNumber, String token) {
        Pageable pageable = PageRequest.of(pageNumber, 3);
        String companyId = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        Page<ProductCategory> categories = productCategoryRepository.findByCompanyIdId(companyId, pageable);
        return categories.getContent();
    }
}