// com.example.myapp.dao.BookMapper.java
package com.example.myapp.dao;

import com.example.myapp.domain.Book;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookMapper {

    List<Book> selectPage(@Param("q") String q,
                          @Param("category") String category,
                          @Param("status") String status,
                          @Param("size") int size,
                          @Param("offset") int offset,
                          @Param("orderBy") String orderBy); // 화이트리스트로 검증해서 넣기

    long selectCount(@Param("q") String q,
                     @Param("category") String category,
                     @Param("status") String status);

    Book selectOne(@Param("id") Long id);
}
