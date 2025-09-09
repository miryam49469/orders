package com.yellow.ordermanageryellow.exceptions;

public class NoPermissionException extends RuntimeException {
    public NoPermissionException(String errorMessage){
        super(errorMessage);
    }
}