package com.example.myapp.domain;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookStock {
    private Long bookId;   // 어떤 책인지 연결 (Book 객체 대신 ID만 저장)
    private Integer qty;   // 재고 수량
}
