// BookReview.java
package com.example.myapp.domain;

import lombok.Data;
import java.time.OffsetDateTime;

@Data
public class BookReview {
    private Long id;
    private Long bookId;
    private Integer rating;
    private String title;
    private String content;
    private String userDisplay;
    private Integer helpfulCount;
    private OffsetDateTime createdAt;
}
