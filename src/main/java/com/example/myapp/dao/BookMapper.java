// BookMapper.java
package com.example.myapp.dao;

import com.example.myapp.domain.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookMapper {

    List<Book> searchBooks(@Param("q") String q,
                           @Param("categoryCode") String categoryCode,
                           @Param("status") String status,
                           @Param("limit") int limit,
                           @Param("offset") int offset,
                           @Param("sort") String sort);

    long countBooks(@Param("q") String q,
                    @Param("categoryCode") String categoryCode,
                    @Param("status") String status);

    Book findBookById(@Param("id") Long id);

    BookDetail findDetailByBookId(@Param("bookId") Long bookId);

    List<BookTocItem> findTocByBookId(@Param("bookId") Long bookId);

    BookAuthorNotes findAuthorNotesByBookId(@Param("bookId") Long bookId);

    // 리뷰 페이지네이션
    List<BookReview> findReviews(
            @Param("bookId") Long bookId,
            @Param("limit") int limit,
            @Param("offset") int offset,
            @Param("orderBy") String orderBy   // "created_at" 등
    );

    long countReviews(@Param("bookId") Long bookId);
}
