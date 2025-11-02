// com.example.myapp.domain.Category.java
package com.example.myapp.domain;

import lombok.Data;

@Data
public class Category {
    private Long id;
    private String code;
    private String name;
    private Long parentId;

    // 선택: 책 개수 응답용
    private Long bookCount;
}
