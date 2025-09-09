package com.yellow.ordermanageryellow.service;
import com.yellow.ordermanageryellow.Dao.OrdersRepository;
import com.yellow.ordermanageryellow.Dto.TopEmploeeyDTO;
import com.yellow.ordermanageryellow.model.Orders;
import com.yellow.ordermanageryellow.model.Users;
import com.yellow.ordermanageryellow.security.EncryptedData;
import com.yellow.ordermanageryellow.security.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import java.util.Arrays;
import org.bson.Document;
import org.bson.types.ObjectId;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import com.mongodb.client.AggregateIterable;
import com.yellow.ordermanageryellow.Dto.ProductAmountDto;
import com.yellow.ordermanageryellow.Dto.TopProductDTO;
import com.yellow.ordermanageryellow.Exception.NoDataException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.*;
import org.springframework.stereotype.Service;
import org.bson.Document;
@Service
public class GraphService {
    @Autowired
    private OrdersRepository orderRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private JwtToken jwtToken;
    public List<TopEmploeeyDTO> topEmployee(String token) {
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        Aggregation aggregation = newAggregation(
                match(Criteria.where("company.$id").is(new ObjectId(company)).
                        and("auditData.createDate").gte(LocalDateTime.now().minusMonths(3))),
                match(Criteria.where("orderStatusId").is(Orders.status.Approved)),
                group("employee").count().as("countOfDeliveredOrders"),
                project("countOfDeliveredOrders").and("_id").as("employee"),
                sort(Sort.Direction.DESC, "countOfDeliveredOrders"),
                limit(5)
        );
        AggregationResults<TopEmploeeyDTO> result = mongoTemplate.aggregate(
                aggregation, Orders.class, TopEmploeeyDTO.class
        );
        List<TopEmploeeyDTO> topEmployees = result.getMappedResults();
        return topEmployees;
    }
    public AggregateIterable<Document> aggregationTopSoldProduct(String token) {
        LocalDate currentDate = LocalDate.now();
        LocalDate beginningOfCurrentMonth = currentDate.withDayOfMonth(1);
        LocalDate threeMonthsAgo = beginningOfCurrentMonth.minusMonths(3);
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String startDate = threeMonthsAgo.format(formatter);
        String endDate = beginningOfCurrentMonth.format(formatter);
        Date javaStartDate = Date.from(LocalDate.parse(startDate, formatter).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date javaEndDate = Date.from(LocalDate.parse(endDate, formatter).atStartOfDay(ZoneId.systemDefault()).toInstant());
        AggregateIterable<Document> result = mongoTemplate.getCollection("Orders").aggregate(Arrays.asList(new Document("$match",
                        new Document("auditData.createDate",
                                new Document("$gte", javaStartDate)
                                        .append("$lt", javaEndDate))
                                .append("orderStatusId", "Delivered")
                                .append("company.$id",
                                        new ObjectId(company))),
                new Document("$unwind",
                        new Document("path", "$orderItems")),
                new Document("$group",
                        new Document("_id",
                                new Document("month",
                                        new Document("$month", "$auditData.createDate"))
                                        .append("product", "$orderItems.productId"))
                                .append("count",
                                        new Document("$sum", "$orderItems.quantity"))),
                new Document("$addFields",
                        new Document("newField", "$_id.product.$id")),
                new Document("$lookup",
                        new Document("from", "Product")
                                .append("localField", "_id.product.$id")
                                .append("foreignField", "_id")
                                .append("as", "product")),
                new Document("$unwind",
                        new Document("path", "$product")
                                .append("preserveNullAndEmptyArrays", true)),
                new Document("$sort",
                        new Document("count", -1L)),
                new Document("$group",
                        new Document("_id", "$_id.month")
                                .append("products",
                                        new Document("$push",
                                                new Document("product", "$product.name")
                                                        .append("totalQuantity", "$count")))),
                new Document("$project",
                        new Document("_id", 0L)
                                .append("month", "$_id")
                                .append("product",
                                        new Document("$slice", Arrays.asList("$products", 5L))))));
        return result;
    }
    @SneakyThrows
    public List<TopProductDTO> topSoldProduct(String token) {
        AggregateIterable<Document> result = aggregationTopSoldProduct(token);
        List<TopProductDTO> topProductsList = new ArrayList<>();
        for (Document document : result) {
            System.out.println(result);
            int monthInt = document.getInteger("month");
            Month monthEnum = Month.of(monthInt);
            TopProductDTO TopProductDTO = new TopProductDTO();
            TopProductDTO.setMonth(monthEnum);
            List<Document> products = (List<Document>) document.get("product");
            List<ProductAmountDto> ListProductAmountDto = new ArrayList<>();
            for (Document product : products) {
                String productName = product.getString("product");
                Double totalQuantity = product.getDouble("totalQuantity");
               // Integer totalQuantity = product.getInteger("totalQuantity");
                ProductAmountDto productAmountDto = new ProductAmountDto();
                productAmountDto.setProductName(productName);
                productAmountDto.setAmount(totalQuantity);
                ListProductAmountDto.add(productAmountDto);
            }
            TopProductDTO.setProducts(ListProductAmountDto);
            topProductsList.add(TopProductDTO);
        }
        if (topProductsList.size() == 0)
            throw new NoDataException("no orders in the last three months");
        return topProductsList;
    }
    public Map<Month, Map<Integer, Integer>> getStatus(Integer monthAmount, String token) {
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        LocalDate currentDate = LocalDate.now();
        LocalDate MonthsAgo = currentDate.minusMonths(monthAmount);
        Aggregation aggregation = newAggregation(
                match(Criteria.where("company.$id").is(new ObjectId(company))
                        .and("auditData.createDate").gte(MonthsAgo)),
                project()
                        .andExpression("month(auditData.createDate)").as("month")
                        .and("orderStatusId").as("orderStatusId"),
                group("month")
                        .sum(ConditionalOperators.when(ComparisonOperators.valueOf("orderStatusId").equalToValue("Cancelled")).then(1).otherwise(0)).as("Cancelled").sum(ConditionalOperators.when(ComparisonOperators.valueOf("orderStatusId").equalToValue("Approved")).then(1).otherwise(0)).as("Approved"),
                project()
                        .and("_id").as("month")
                        .and("Cancelled").as("Cancelled")
                        .and("Approved").as("Approved")
        );
        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "Orders", Document.class);
        List<Document> mappedResults = results.getMappedResults();
        System.out.println("mappedResults" + mappedResults);
        Map<Month, Map<Integer, Integer>> resultMap = new HashMap<>();
        for (Document mappedResult : mappedResults) {
            Month month = Month.of(mappedResult.getInteger("month"));
            int Cancelled = mappedResult.getInteger("Cancelled", 0);
            int Delivered = mappedResult.getInteger("Approved", 0);
            Map<Integer, Integer> tempMap = new HashMap<>();
            tempMap.put(Cancelled, Delivered);
            resultMap.put(month, tempMap);
        }
        return resultMap;
    }
}