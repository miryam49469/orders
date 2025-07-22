package com.yellow.ordermanageryellow.model;

public enum RoleName
{
    ADMIN("ADMIN"),
    EMPLOYEE("EMPLOYEE"),
    CUSTOMER("CUSTOMER");
    private final String name;

    RoleName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
