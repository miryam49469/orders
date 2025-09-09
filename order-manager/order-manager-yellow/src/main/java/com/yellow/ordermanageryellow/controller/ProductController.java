package com.yellow.ordermanageryellow.controller;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.yellow.ordermanageryellow.Exception.ObjectAllReadyExists;
import com.yellow.ordermanageryellow.exceptions.NoPermissionException;
import com.yellow.ordermanageryellow.service.ProductService;
import com.yellow.ordermanageryellow.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import java.util.NoSuchElementException;
@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("/product")
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity addProduct(@RequestBody Product product, @RequestHeader("Authorization") String token)  {
        Product createdProduct;
        try{
            createdProduct=  productService.addProduct(product,token);
            return new ResponseEntity<>(createdProduct, HttpStatus.OK);
    }catch (TokenExpiredException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }catch (NoPermissionException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }catch (ObjectAllReadyExists e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

    }

    @GetMapping("/names/{prefix}")
    public ResponseEntity getAllNamesProducts(@PathVariable("prefix") String prefix, @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductsNames(token, prefix));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity getAllProduct() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @RequestMapping("/byCompany")
    @GetMapping
    public ResponseEntity getAllProductByCompany( @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductByCompany(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity editProduct(@RequestBody Product product,@RequestHeader("Authorization") String token) {
        try {
            Product updatedProduct = this.productService.editProduct(product,token);
            return ResponseEntity.ok(updatedProduct);
        } catch (NoSuchElementException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } catch (ObjectAllReadyExists e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }catch (NoPermissionException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProduct(@PathVariable String id,@RequestHeader("Authorization") String token) {
        try {
            this.productService.deleteProduct(id,token);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } catch (NoPermissionException ex) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/{pageNumber}")
    public ResponseEntity getAllProductPaginationt(@PathVariable int pageNumber,@RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsPaginatin(pageNumber,token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
