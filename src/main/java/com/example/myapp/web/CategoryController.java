// com.example.myapp.web.CategoryController.java
package com.example.myapp.web;

import com.example.myapp.domain.Category;
import com.example.myapp.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService svc;

    public CategoryController(CategoryService svc) {
        this.svc = svc;
    }

    // 예: /api/categories?withCounts=1&status=ACTIVE
    @GetMapping
    public List<Category> list(@RequestParam(name="withCounts", required=false, defaultValue="0") int withCounts,
                               @RequestParam(required=false, defaultValue="ACTIVE") String status) {
        return svc.list(withCounts == 1, status);
    }
}
