// com.example.myapp.dao.CategoryMapper.java
package com.example.myapp.dao;

import com.example.myapp.domain.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategoryMapper {
    List<Category> selectAll();

    // 상태로 필터해 책 개수까지 가져오기 (예: ACTIVE)
    List<Category> selectWithCounts(@Param("status") String status);
}
