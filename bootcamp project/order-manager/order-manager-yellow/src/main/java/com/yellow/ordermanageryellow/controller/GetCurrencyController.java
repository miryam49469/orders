package com.yellow.ordermanageryellow.controller;

import com.yellow.ordermanageryellow.model.Currency;
import com.yellow.ordermanageryellow.service.GetCurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/GetCurrency")

public class GetCurrencyController {
    @Autowired
    private  GetCurrencyService getcurrencyService;
    @GetMapping
    public List<String> get() {
        return getcurrencyService.get();
    }
}
