package com.example.ai;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/ai")
public class AiProxyController {

    private final RestTemplate restTemplate;

    // 로컬 FastAPI 서버 주소
    private final String aiBaseUrl = "http://localhost:8010";

    public AiProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/chat/simple")
    public ResponseEntity<String> proxyChatSimple(@RequestBody String body) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                aiBaseUrl + "/ai/chat/simple",
                entity,
                String.class
        );

        return ResponseEntity.status(response.getStatusCode())
                .body(response.getBody());
    }
}
