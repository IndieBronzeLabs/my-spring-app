package com.example.myapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    // React 앱의 모든 라우트를 index.html로 포워드
    @RequestMapping(value = {"/", "/users", "/about", "/dashboard"})
    public String index() {
        return "forward:/index.html";
    }
}