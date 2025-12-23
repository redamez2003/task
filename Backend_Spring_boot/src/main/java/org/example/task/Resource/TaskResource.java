package org.example.task.Resource;
import org.example.task.Entity.Task;  // entité

import org.example.task.Entity.Project;
import org.example.task.Service.ProjectService;
import org.example.task.Service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskResource {
    private final TaskService taskService;
    private final ProjectService projectService;

    public TaskResource(TaskService taskService, ProjectService projectService) {
        this.taskService = taskService;
        this.projectService = projectService;
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<Task> createTask(@PathVariable Long projectId, @RequestBody Task task) {
        Project project = projectService.getProject(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        task.setProject(project);
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<Task>> getProjectTasks(@PathVariable Long projectId) {
        Project project = projectService.getProject(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        return ResponseEntity.ok(taskService.getProjectTasks(project));
    }

    @PutMapping("/complete/{taskId}")
    public ResponseEntity<Task> markCompleted(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.markCompleted(taskId));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted");
    }
}
