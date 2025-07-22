package com.yellow.ordermanageryellow.service;


import com.yellow.ordermanageryellow.Dto.ProductDTO;
import com.yellow.ordermanageryellow.Dto.ProductDiscauntDTO;
import com.yellow.ordermanageryellow.Dto.ProductNameDTO;
import com.yellow.ordermanageryellow.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "productCategoryId", target = "productCategoryId.id")
    public Product dtoToProduct(ProductDTO productDTO);

    @Mapping(source = "productCategoryId.name", target = "productCategoryId")
    public ProductDTO productToDto(Product product);

    public List<ProductDTO> productToDto(List<Product> list);

    public List<Product> dtoToProduct(List<ProductDTO> list);
    public List<ProductDiscauntDTO> ProductToProductDiscauntDTO(List<Product> list);

    public List<Product> ProductDiscauntDTOToProduct(List< ProductDiscauntDTO> list);

    public ProductNameDTO ProductToProductNameDTO(Product product);

    public List<ProductNameDTO> ProductToProductNameDTO(List<Product> list);
}
