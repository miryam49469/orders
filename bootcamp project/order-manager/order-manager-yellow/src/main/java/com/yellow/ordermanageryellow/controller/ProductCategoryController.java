package com.yellow.ordermanageryellow.controller;

import com.yellow.ordermanageryellow.exceptions.NoPermissionException;
import com.yellow.ordermanageryellow.exceptions.ObjectAlreadyExistException;
import com.yellow.ordermanageryellow.model.ProductCategory;
import com.yellow.ordermanageryellow.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/categories")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    @Autowired
    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public ResponseEntity getAllCategories() {
        List<ProductCategory> categories;
        try {
            categories = productCategoryService.findAll();
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity createCategory(@RequestHeader("Authorization") String token,@RequestBody ProductCategory newCategory) {
        ProductCategory createdCategory;
        try {
            createdCategory = productCategoryService.insert(newCategory,token);
            return new ResponseEntity<>(createdCategory, HttpStatus.OK);
        } catch (ObjectAlreadyExistException ex) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        } catch (NoPermissionException ex) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (Exception ex) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity deleteCategory(@RequestHeader("Authorization") String token, @PathVariable String categoryId){
        try {
            productCategoryService.delete(token, categoryId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (EmptyResultDataAccessException ex) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } catch (NoPermissionException ex) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        } catch (Exception ex) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping
    public ResponseEntity<?> updateCategory(@RequestHeader("Authorization") String token,@RequestBody ProductCategory updatedCategory) {
        try {
            ProductCategory updateItem = productCategoryService.update(token,updatedCategory);
            return ResponseEntity.ok(updateItem);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        } catch (NoPermissionException ex) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        } catch (Exception ex) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //This function has to be deleted, Just for trying the token
    @GetMapping
    @RequestMapping("/createToken")
    public String createToken() {
        return productCategoryService.fill();
    }
@GetMapping("/{pageNumber}")
public ResponseEntity getAllcategoriesPaginationt(@PathVariable int pageNumber,@RequestHeader("Authorization") String token) {
    try {
        return ResponseEntity.status(HttpStatus.OK).body(productCategoryService.getCategoriesPagination(pageNumber,token));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}}