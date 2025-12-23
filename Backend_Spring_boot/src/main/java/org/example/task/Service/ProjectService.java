package org.example.task.Service;
import org.example.task.Entity.Project;
import org.example.task.Entity.Task;
import org.example.task.Entity.User;
import org.example.task.Repository.ProjectRepository;
import org.example.task.Repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service

public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public ProjectService(ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getUserProjects(User user) {
        return projectRepository.findByUser(user);
    }

    public Optional<Project> getProject(Long id) {
        return projectRepository.findById(id);
    }

    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public double getProgress(Project project) {
        List<Task> tasks = taskRepository.findByProject(project);
        if (tasks.isEmpty()) return 0;
        long completed = tasks.stream().filter(Task::isCompleted).count();
        return ((double) completed / tasks.size()) * 100;
    }
}