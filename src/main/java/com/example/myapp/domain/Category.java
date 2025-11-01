package com.example.myapp.domain;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    private Long id;
    private String code;
    private String name;
}
