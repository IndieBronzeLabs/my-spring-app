package com.example.myapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")  // /api 경로 추가
public class HomeController {

    @GetMapping("/info")  // 기존 / 대신 /api/info
    public Map<String, Object> info() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Spring Boot + React 애플리케이션");
        response.put("timestamp", LocalDateTime.now());
        response.put("status", "success");
        response.put("version", "1.0.0");
        return response;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot API!";
    }
}