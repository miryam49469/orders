

package com.yellow.ordermanageryellow.service;


import com.yellow.ordermanageryellow.model.Currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class GetCurrencyService {
    public List<String> get() {
        List<String> names = new ArrayList<>();
        for (Currency currency : Currency.values()) {
            names.add(currency.name().toString());
        }
        return names;
    }
}