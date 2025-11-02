// PagedResponse.java
package com.example.myapp.api.support;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class PagedResponse<T> {
    private List<T> content;
    private long totalElements;
    private int page;
    private int size;
    private boolean hasNext;
}
