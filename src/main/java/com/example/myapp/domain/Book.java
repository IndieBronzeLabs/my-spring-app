package com.example.myapp.domain;

import lombok.*;

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
    private String status = "ACTIVE";
    private Category category;
}
