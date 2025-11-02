package com.example.myapp.service;

import com.example.myapp.api.support.PagedResponse;
import com.example.myapp.dao.BookMapper;
import com.example.myapp.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookMapper bookMapper;

    public Book findBook(Long id) {
        return bookMapper.findBookById(id);
    }

    public BookDetail findDetail(Long bookId) {
        return bookMapper.findDetailByBookId(bookId);
    }

    public List<BookTocItem> findToc(Long bookId) {
        return bookMapper.findTocByBookId(bookId);
    }

    public BookAuthorNotes findAuthorNotes(Long bookId) {
        return bookMapper.findAuthorNotesByBookId(bookId);
    }

    public PagedResponse<BookReview> findReviews(Long bookId, int page, int size, String sort) {
        int limit = Math.max(1, size);
        int offset = Math.max(0, page) * limit;

        String orderBy = "created_at";
        if (StringUtils.hasText(sort)) {
            // sort=created_at or helpful_count 등 화이트리스트 검사 권장
            if ("helpful_count".equalsIgnoreCase(sort)) orderBy = "helpful_count";
        }

        List<BookReview> content = bookMapper.findReviews(bookId, limit, offset, orderBy);
        long total = bookMapper.countReviews(bookId);
        boolean hasNext = (long) (page + 1) * limit < total;

        return new PagedResponse<>(content, total, page, limit, hasNext);
    }

    /** 통합 응답 */
    public BookFullResponse findFull(Long bookId, int reviewPage, int reviewSize, String reviewSort) {
        Book book = findBook(bookId);
        if (book == null) return null;

        BookDetail detail = findDetail(bookId);
        List<BookTocItem> toc = findToc(bookId);
        BookAuthorNotes notes = findAuthorNotes(bookId);
        PagedResponse<BookReview> reviews = findReviews(bookId, reviewPage, reviewSize, reviewSort);

        return new BookFullResponse(book, detail, toc, notes, reviews);
    }


    public Map<String, Object> searchBooks(String q, String categoryCode,
                                           String status, int page, int size, String sort) {
        int limit = Math.max(1, size);
        int offset = Math.max(0, page) * limit;

        List<Book> content = bookMapper.searchBooks(q, categoryCode, status, limit, offset, sort);
        long total = bookMapper.countBooks(q, categoryCode, status);

        int totalPages = (int) Math.ceil((double) total / size);
        boolean hasNext = page + 1 < totalPages;

        return Map.of(
                "content", content,
                "page", page,
                "size", size,
                "totalElements", total,
                "totalPages", totalPages,
                "hasNext", hasNext
        );
    }

    // DTO for /full
    @lombok.Data
    @lombok.AllArgsConstructor
    public static class BookFullResponse {
        private Book book;
        private BookDetail detail;
        private List<BookTocItem> toc;
        private BookAuthorNotes authorNotes;
        private PagedResponse<BookReview> reviews;
    }
}
