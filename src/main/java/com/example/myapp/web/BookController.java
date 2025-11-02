package com.example.myapp.web;

import com.example.myapp.api.support.PagedResponse;
import com.example.myapp.domain.*;
import com.example.myapp.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    // ⭐ 추가: 책 목록 조회
    @GetMapping
    public ResponseEntity<Map<String, Object>> getBooks(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String categoryCode,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String sort
    ) {
        Map<String, Object> result = bookService.searchBooks(q, categoryCode, status, page, size, sort);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findBook(@PathVariable Long id) {
        Book book = bookService.findBook(id);
        return (book == null) ? ResponseEntity.notFound().build() : ResponseEntity.ok(book);
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity<BookDetail> findDetail(@PathVariable Long id) {
        BookDetail detail = bookService.findDetail(id);
        return (detail == null) ? ResponseEntity.noContent().build() : ResponseEntity.ok(detail);
    }

    @GetMapping("/{id}/toc")
    public ResponseEntity<List<BookTocItem>> findToc(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.findToc(id));
    }

    @GetMapping("/{id}/author-notes")
    public ResponseEntity<BookAuthorNotes> findAuthorNotes(@PathVariable Long id) {
        BookAuthorNotes notes = bookService.findAuthorNotes(id);
        return (notes == null) ? ResponseEntity.noContent().build() : ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<PagedResponse<BookReview>> findReviews(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(name = "sort", defaultValue = "created_at") String sort
    ) {
        return ResponseEntity.ok(bookService.findReviews(id, page, size, sort));
    }

    @GetMapping("/{id}/full")
    public ResponseEntity<BookService.BookFullResponse> findFull(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int reviewPage,
            @RequestParam(defaultValue = "10") int reviewSize,
            @RequestParam(defaultValue = "created_at") String reviewSort
    ) {
        BookService.BookFullResponse resp = bookService.findFull(id, reviewPage, reviewSize, reviewSort);
        return (resp == null) ? ResponseEntity.notFound().build() : ResponseEntity.ok(resp);
    }
}