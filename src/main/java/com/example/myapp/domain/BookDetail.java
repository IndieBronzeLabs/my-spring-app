// BookDetail.java
package com.example.myapp.domain;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class BookDetail {
    private Long bookId;
    private String description;
    private Integer pages;
    private LocalDate publicationDate;
    private String binding;
    private String language;
    private String keywords; // jsonb → MyBatis TypeHandler로 문자열 리스트 매핑
}
