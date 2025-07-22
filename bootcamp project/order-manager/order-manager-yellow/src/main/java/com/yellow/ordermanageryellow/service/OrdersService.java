package com.yellow.ordermanageryellow.service;

import com.yellow.ordermanageryellow.Dao.CompanyRepository;
import com.yellow.ordermanageryellow.Dto.OrderDTO;
import com.yellow.ordermanageryellow.Dto.OrderMapper;
import com.yellow.ordermanageryellow.Dao.CompanyRepository;
import com.yellow.ordermanageryellow.Dto.OrderDTO;
import com.yellow.ordermanageryellow.Dto.OrderMapper;
import com.yellow.ordermanageryellow.Dto.ProductDTO;
import com.yellow.ordermanageryellow.Dao.OrdersRepository;
import com.yellow.ordermanageryellow.Dao.ProductRepository;

import com.yellow.ordermanageryellow.exceptions.NotValidStatusExeption;
import com.yellow.ordermanageryellow.model.*;
import com.yellow.ordermanageryellow.model.Orders.status;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;

import com.yellow.ordermanageryellow.security.EncryptedData;
import com.yellow.ordermanageryellow.security.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.*;


@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ConvertService convertService;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private JwtToken jwtToken;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ChargingService chargingService=new ChargingService();

    @Value("${pageSize}")
    private int pageSize;
    public Orders getOrderById(String id){
        return ordersRepository.findById(id).get();
    }

    public List<Orders> getOrders(String token, List <String> orderStatusId, int pageNumber) {
        System.out.print("getOrders");
        System.out.print(token);
        System.out.print(orderStatusId);
        System.out.print(pageNumber);
        String companyId= this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        //Sort.Order sortOrder = Sort.Order.asc("auditData.updateDate");
        //String companyId="64dbb3f095f36c150987e7e0";
        //  Sort sort = Sort.by(sortOrder);
        Pageable pageable = PageRequest.of(pageNumber, pageSize/* pageSize parameter omitted */);
        // Pageable pageable = PageRequest.of(pageNumber, pageSize/* pageSize parameter omitted */, sort);
        try {
            List<Orders> pageOrders = ordersRepository.findByOrderStatusIdInAndCompanyId( pageable, orderStatusId,companyId);
            System.out.print(pageOrders);
            return pageOrders;
        }catch (Exception err){
            System.out.print("stop");
        }
        return null;
    }

    public String insert(Orders newOrder,String token) {
        if (newOrder.getOrderStatusId() != status.New && newOrder.getOrderStatusId() != status.Approved) {
            throw new NotValidStatusExeption("Order should be in status new or approve");
        }
        String companyId = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        Company company = companyRepository.findById(companyId).get();
        AuditData auditData = new AuditData();
        auditData.setCreateDate(LocalDateTime.now());
        newOrder.setCompany(company);
        newOrder.setAuditData(auditData);
        Orders order = ordersRepository.insert(newOrder);
        if (newOrder.getOrderStatusId() == status.Approved)
            chargingService.chargingStep(order);
        return order.getId();
    }

    public boolean edit(Orders currencyOrder) {
        if (currencyOrder.getOrderStatusId() != status.Cancelled && currencyOrder.getOrderStatusId() != status.Approved) {
            throw new NotValidStatusExeption("You can only approve or cancel an order");
        }
        Optional<Orders> order = ordersRepository.findById(currencyOrder.getId());
        if (order.isEmpty()) {
            throw new NoSuchElementException();
        }
        if (order.get().getOrderStatusId() != status.New && order.get().getOrderStatusId() != status.Packing) {
            throw new NotValidStatusExeption("It is not possible to change an order that is not in status new or packaging");
        }
        if(order.get().getOrderStatusId() == status.Approved)
            chargingService.chargingStep(order.get());
        ordersRepository.save(currencyOrder);
        return true;
    }
    public Map<String, HashMap<Double, Integer>> calculateOrderService(@RequestParam @NotNull Orders order) {
        HashMap<String, HashMap<Double, Integer>> calculatedOrder = new HashMap<String, HashMap<Double, Integer>>();
        double total = 0;
        String currencyOfOrder = order.getCurrency().toString();
        String currencyOfCompany="DOLLAR";
         if(order.getOrderItems()!=null)
        currencyOfCompany=companyRepository.findById(order.getOrderItems().get(0).getProductId().getCompanyId().getId()).get().getCurrency().toString();

        for (int i = 0; i < order.getOrderItems().stream().count(); i++) {
            Order_Items orderItem = order.getOrderItems().get(i);
            Optional<Product> p = productRepository.findById(orderItem.getProductId().getId());
            double rate;
            if(currencyOfCompany.equals(currencyOfOrder))
                rate=1;
            else
                rate = convertService.convertCurrency(currencyOfCompany, currencyOfOrder);
            HashMap<Double, Integer> o = new HashMap<Double, Integer>();
            double sum = 0;
            if (p.get().getDiscount() == Discount.FixedAmount) {

                sum = (p.get().getPrice()- p.get().getDiscountAmount()) * order.getOrderItems().get(i).getQuantity();
                o.put(sum, p.get().getDiscountAmount());

            } else {
                sum = (p.get().getPrice() * p.get().getDiscountAmount()) / 100 * (100 - p.get().getDiscountAmount()) * order.getOrderItems().get(i).getQuantity();
                o.put(sum, p.get().getDiscountAmount());
            }
            calculatedOrder.put(p.get().getName(), o);
            total += sum;
        }
        HashMap<Double, Integer> o = new HashMap<Double, Integer>();
        o.put(total, -1);
        calculatedOrder.put("-1", o);
        return calculatedOrder;
    }


}
