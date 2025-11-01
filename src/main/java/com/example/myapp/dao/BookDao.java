package com.example.myapp.dao;

import com.example.myapp.domain.Book;
import com.example.myapp.domain.Category;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class BookDao {
    private final NamedParameterJdbcTemplate jdbc;

    public BookDao(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final Set<String> ALLOWED_SORT = Set.of(
            "id","title","author","price","publisher","isbn","status"
    );

    private static String safeSort(String sort) {
        String[] parts = (sort == null ? "id,desc" : sort).split(",");
        String field = parts[0].trim().toLowerCase();
        String dir = (parts.length>1 ? parts[1].trim().toLowerCase() : "desc");
        if (!ALLOWED_SORT.contains(field)) field = "id";
        if (!dir.equals("asc")) dir = "desc";
        return field + " " + dir;
    }

    private static final RowMapper<Book> BOOK_MAPPER = (rs, i) -> {
        Book b = new Book();
        b.setId(rs.getLong("id"));
        b.setTitle(rs.getString("title"));
        b.setAuthor(rs.getString("author"));
        b.setTranslator(rs.getString("translator"));
        b.setPrice((Integer) rs.getObject("price"));      // null-safe
        b.setImageUrl(rs.getString("image_url"));
        b.setBadge(rs.getString("badge"));
        b.setPublisher(rs.getString("publisher"));
        b.setIsbn(rs.getString("isbn"));
        b.setStatus(rs.getString("status"));

        Long catId = (Long) rs.getObject("category_id");
        if (catId != null) {
            Category c = new Category();
            c.setId(catId);
            c.setCode(rs.getString("category_code"));
            c.setName(rs.getString("category_name"));
            b.setCategory(c);
        }
        return b;
    };

    public Map<String,Object> page(String q, String categoryCode, String status,
                                   int page, int size, String sort) {
        String orderBy = safeSort(sort);
        int offset = page * size;

        String baseWhere = """
            WHERE ( :q IS NULL OR :q = '' 
                    OR LOWER(b.title) LIKE LOWER(CONCAT('%', :q, '%')) 
                    OR LOWER(b.author) LIKE LOWER(CONCAT('%', :q, '%')) )
              AND ( :category IS NULL OR :category = '' 
                    OR (c.id IS NOT NULL AND c.code = :category) )
              AND ( :status IS NULL OR :status = '' OR b.status = :status )
            """;

        String sql = """
            SELECT b.id, b.title, b.author, b.translator, b.price, b.image_url,
                   b.badge, b.publisher, b.isbn, b.status, b.category_id,
                   c.code AS category_code, c.name AS category_name,
                   s.qty AS stock_qty
            FROM books b
            LEFT JOIN categories c ON c.id = b.category_id
            LEFT JOIN book_stocks s ON s.book_id = b.id
            """ + baseWhere + """
            ORDER BY """ + orderBy + """
            LIMIT :size OFFSET :offset
            """;

        String countSql = """
            SELECT COUNT(b.id)
            FROM books b
            LEFT JOIN categories c ON c.id = b.category_id
            """ + baseWhere;

        Map<String,Object> params = new HashMap<>();
        params.put("q", q);
        params.put("category", categoryCode);
        params.put("status", status);
        params.put("size", size);
        params.put("offset", offset);

        var content = jdbc.query(sql, params, BOOK_MAPPER);
        long total = jdbc.queryForObject(countSql, params, Long.class);

        int totalPages = (int) Math.ceil((double) total / size);
        boolean hasNext = page + 1 < totalPages;

        return Map.of(
                "content", content,
                "page", page,
                "size", size,
                "totalElements", total,
                "totalPages", totalPages,
                "hasNext", hasNext
        );
    }

    public Optional<Book> findById(Long id) {
        String sql = """
            SELECT b.id, b.title, b.author, b.translator, b.price, b.image_url,
                   b.badge, b.publisher, b.isbn, b.status, b.category_id,
                   c.code AS category_code, c.name AS category_name,
                   s.qty AS stock_qty
            FROM books b
            LEFT JOIN categories c ON c.id = b.category_id
            LEFT JOIN book_stocks s ON s.book_id = b.id
            WHERE b.id = :id
            """;
        var list = jdbc.query(sql, Map.of("id", id), BOOK_MAPPER);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }
}
