// BookAuthorNotes.java
package com.example.myapp.domain;

import lombok.Data;

@Data
public class BookAuthorNotes {
    private Long bookId;
    private String authorBio;
    private String translatorBio;
}
