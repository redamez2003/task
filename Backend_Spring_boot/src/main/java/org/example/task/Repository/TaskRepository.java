package org.example.task.Repository;

import org.example.task.Entity.Project;
import org.example.task.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);
}
