// com.example.myapp.service.BookService.java
package com.example.myapp.service;

import com.example.myapp.dao.BookMapper;
import com.example.myapp.domain.Book;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookService {
    private final BookMapper mapper;
    private static final Set<String> ALLOWED_SORT = Set.of("id","title","author","price","publisher","isbn","status");

    public BookService(BookMapper mapper) {
        this.mapper = mapper;
    }

    private String safeOrderBy(String sort) {
        String[] parts = (sort == null ? "id,desc" : sort).split(",");
        String field = parts[0].trim().toLowerCase();
        String dir = (parts.length > 1 ? parts[1].trim().toLowerCase() : "desc");
        if (!ALLOWED_SORT.contains(field)) field = "id";
        if (!"asc".equals(dir)) dir = "desc";
        return "b." + field + " " + dir; // ← prefix
    }

    public Map<String,Object> page(String q, String category, String status, int page, int size, String sort) {
        String orderBy = safeOrderBy(sort);
        int offset = page * size;

        List<Book> content = mapper.selectPage(q, category, status, size, offset, orderBy);
        long total = mapper.selectCount(q, category, status);
        int totalPages = (int) Math.ceil((double) total / size);

        return Map.of(
                "content", content,
                "page", page,
                "size", size,
                "totalElements", total,
                "totalPages", totalPages,
                "hasNext", page + 1 < totalPages
        );
    }

    public Book get(Long id) {
        return mapper.selectOne(id);
    }
}
