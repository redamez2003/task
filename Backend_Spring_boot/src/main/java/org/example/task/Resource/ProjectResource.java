package org.example.task.Resource;

import org.example.task.Entity.Project;
import org.example.task.Entity.User;
import org.example.task.Repository.UserRepository;
import org.example.task.Service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectResource {
    private final ProjectService projectService;
    private final UserRepository userRepository;

    public ProjectResource(ProjectService projectService, UserRepository userRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).get();
        project.setUser(user);
        return ResponseEntity.ok(projectService.createProject(project));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getUserProjects(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).get();
        return ResponseEntity.ok(projectService.getUserProjects(user));
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<Double> getProgress(@PathVariable Long id) {
        Project project = projectService.getProject(id).orElseThrow(() -> new RuntimeException("Project not found"));
        return ResponseEntity.ok(projectService.getProgress(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted");
    }
}
