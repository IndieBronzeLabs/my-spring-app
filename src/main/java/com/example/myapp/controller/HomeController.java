package com.example.myapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "안녕하세요! Spring Boot 애플리케이션이 실행 중입니다!");
        response.put("timestamp", LocalDateTime.now());
        response.put("status", "success");
        response.put("version", "1.0.0");
        return response;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> health = new HashMap<>();
        health.put("status", "UP");
        health.put("database", "H2 (Development)");
        health.put("server", "Running");
        return health;
    }
}