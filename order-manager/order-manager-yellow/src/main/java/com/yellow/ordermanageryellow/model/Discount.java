package com.yellow.ordermanageryellow.model;

public enum Discount {
    Percentage(1),FixedAmount(2);
    private int code;
    private Discount(int code) {
        this.code = code;
    }

    Discount() {
    }
}