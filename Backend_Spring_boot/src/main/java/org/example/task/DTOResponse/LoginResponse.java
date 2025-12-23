package org.example.task.DTOResponse;

public class LoginResponse {
    private String token;
    public LoginResponse(String token) { this.token = token; }
    public String getToken() { return token; }
}
