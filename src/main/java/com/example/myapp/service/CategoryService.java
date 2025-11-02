// com.example.myapp.service.CategoryService.java
package com.example.myapp.service;

import com.example.myapp.dao.CategoryMapper;
import com.example.myapp.domain.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryMapper mapper;

    public CategoryService(CategoryMapper mapper) {
        this.mapper = mapper;
    }

    public List<Category> list(boolean withCounts, String status) {
        if (withCounts) {
            return mapper.selectWithCounts(status);
        }
        return mapper.selectAll();
    }
}
