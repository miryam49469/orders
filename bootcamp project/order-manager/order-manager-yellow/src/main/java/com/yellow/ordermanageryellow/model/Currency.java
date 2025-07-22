package com.yellow.ordermanageryellow.model;



public enum Currency {
    DOLLAR("USD"),FRANC("CHF"), EURO("EUR"), SHEKEL("ILS"), RUBLE("RUB");
    private String code;
    private Currency(String code) {
        this.code = code;
    }
}

