package com.example.myapp.domain;


import com.example.myapp.domain.Category;
import lombok.*;
import java.time.OffsetDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Book {
    private Long id;
    private String title;
    private String author;
    private String translator;
    private Integer price;
    private String imageUrl;
    private String badge;
    private String publisher;
    private String isbn;
    private String status;
    private Long categoryId;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    private Category category; // join용
}
