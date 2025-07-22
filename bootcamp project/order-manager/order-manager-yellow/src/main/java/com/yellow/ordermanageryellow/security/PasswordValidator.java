//package com.yellow.ordermanageryellow.security;
//
//public class PasswordValidator {
//    public static boolean isValidPassword(String password) {

//        if (password.length() < 8) {
//            return false;
//        }
//        if (!password.matches(".*[A-Z].*")) {
//            return false;
//        }
//        if (!password.matches(".*[a-z].*")) {
//            return false;
//        }
//        if (!password.matches(".*\\d.*")) {
//            return false;
//        }
//        if (password.contains(" ")) {
//            return false;
//        }
//
//        return true;
//    }
//}
