package com.yellow.ordermanageryellow.service;

import com.yellow.ordermanageryellow.Dto.GetRateDto;
import com.yellow.ordermanageryellow.service.RedisService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;

@Service

public class ConvertService {
    @Value("${exchangeRateApi}")
    private String exchangeRateApi;

    @Autowired
    private RedisService redisService;

    @SneakyThrows
    public double convertCurrency(String currencyOfCompany, String currencyOfOrder) {
        String rate="3";
        GetRateDto getRateDto = new GetRateDto(currencyOfCompany, currencyOfOrder, LocalDate.now());
        String key = getRateDto.toString();
        redisService.setValue(key,"3.5");
        if (redisService.isKeyExists(key))
            rate = redisService.getValue(key);
        else {
            String url = String.format(exchangeRateApi, currencyOfCompany, currencyOfOrder);
            WebClient.Builder builder = WebClient.builder();
            rate = builder.build()
                    .get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            redisService.setValue(key, rate);
        }
        System.out.println(rate);
        return Double.parseDouble(rate);
    }
}
