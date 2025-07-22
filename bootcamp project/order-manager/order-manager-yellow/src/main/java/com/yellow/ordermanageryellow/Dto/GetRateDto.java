package com.yellow.ordermanageryellow.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class GetRateDto {

        private String currencyOfCompany;
        private String currencyOfOrder;
        private LocalDate date;

        @Override
        public String toString() {
            return currencyOfCompany + currencyOfOrder + date;
        }

}
