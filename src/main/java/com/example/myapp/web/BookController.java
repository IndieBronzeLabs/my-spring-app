// com.example.myapp.web.BookController.java
package com.example.myapp.web;

import com.example.myapp.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService svc;

    public BookController(BookService svc) {
        this.svc = svc;
    }

    @GetMapping
    public Map<String,Object> list(@RequestParam(required=false) String q,
                                   @RequestParam(required=false) String category,
                                   @RequestParam(required=false, defaultValue="ACTIVE") String status,
                                   @RequestParam(defaultValue="0") int page,
                                   @RequestParam(defaultValue="8") int size,
                                   @RequestParam(defaultValue="id,desc") String sort){
        return svc.page(q, category, status, page, size, sort);
    }

    @GetMapping("/{id}")
    public Object detail(@PathVariable Long id){
        return svc.get(id);
    }
}
