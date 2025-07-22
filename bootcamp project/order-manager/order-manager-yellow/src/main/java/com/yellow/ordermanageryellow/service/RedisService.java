package com.yellow.ordermanageryellow.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;


    public RedisService(RedisTemplate<String, String> redisTemplate){
        this.redisTemplate = redisTemplate;
    }
    public boolean isKeyExists(String key) {
        System.out.println("goood"+redisTemplate.hasKey(key));
        return redisTemplate.hasKey(key);

    }

    public void setValue(String key, String value) {

        redisTemplate.opsForValue().set(key, value);
    }

    public String getValue(String key) {

        return redisTemplate.opsForValue().get(key);
    }
}
