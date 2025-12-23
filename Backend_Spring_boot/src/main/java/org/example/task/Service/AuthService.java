package org.example.task.Service;

import org.example.task.Entity.User;
import org.example.task.Repository.UserRepository;
import org.example.task.Sercurity.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isEmpty()) throw new RuntimeException("Invalid credentials");
        User user = userOpt.get();
        if(!passwordEncoder.matches(password, user.getPassword())) throw new RuntimeException("Invalid credentials");
        return jwtUtil.generateToken(user.getEmail());
    }
}
