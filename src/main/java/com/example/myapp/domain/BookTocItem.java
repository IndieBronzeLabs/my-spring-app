// BookTocItem.java
package com.example.myapp.domain;

import lombok.Data;

@Data
public class BookTocItem {
    private Long bookId;
    private Integer seq;
    private String title;
    private Integer pageFrom;
    private Integer pageTo;
}
