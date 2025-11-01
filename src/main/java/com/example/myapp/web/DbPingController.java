package com.example.myapp.web;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DbPingController {
    private final JdbcTemplate jdbc;

    public DbPingController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/api/db/ping")
    public Map<String, Object> ping() {
        String version = jdbc.queryForObject("SELECT version()", String.class);
        String db = jdbc.queryForObject("SELECT current_database()", String.class);
        String user = jdbc.queryForObject("SELECT current_user", String.class);
        String now = jdbc.queryForObject("SELECT now()::text", String.class);
        return Map.of("ok", true, "db", db, "user", user, "now", now, "version", version);
    }
}
