import { Component, OnInit, ChangeDetectorRef } from '@angular/core';  // <-- Ajoutez ChangeDetectorRef
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectI } from '../project.model';
import { TaskService } from '../../tasks/task';
import { Project } from '../project';
import { TaskI } from '../../tasks/task.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProjectDetail implements OnInit {
  projectId!: number;
  tasks: TaskI[] = [];
  progress: number = 0;
  showTaskForm = false;
  isCreating = false;
  
  newTask: TaskI = {
    title: '',
    description: '',
    dueDate: '',
    completed: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: Project,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef  // <-- AJOUTEZ CECI
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTasks();
    this.loadProgress();
  }

  loadTasks(): void {
    this.taskService.getProjectTasks(this.projectId).subscribe({
      next: (data: TaskI[]) => {
        console.log('Tâches reçues:', data);
        this.tasks = Array.isArray(data) ? data : [];
        console.log('tasks.length:', this.tasks.length);
        this.cdr.detectChanges();  // <-- FORCEZ la détection
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading tasks', err);
        this.cdr.detectChanges();  // <-- Aussi en cas d'erreur
      }
    });
  }

  loadProgress(): void {
    this.projectService.getProgress(this.projectId).subscribe({
      next: (data: number) => {
        console.log('Progrès reçu:', data);
        this.progress = data;
        this.cdr.detectChanges();  // <-- FORCEZ la détection
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading progress', err);
        this.cdr.detectChanges();
      }
    });
  }

  toggleTaskForm(): void {
    this.showTaskForm = !this.showTaskForm;
    this.newTask = {
      title: '',
      description: '',
      dueDate: '',
      completed: false
    };
    this.isCreating = false;
  }

  createTask(): void {
    if (this.isCreating) return;

    const trimmedTitle = this.newTask.title.trim();
    if (!trimmedTitle) {
      return;
    }

    this.newTask.title = trimmedTitle;
    this.isCreating = true;

    console.log('Création de la tâche:', this.newTask);

    this.taskService.createTask(this.projectId, this.newTask).subscribe({
      next: (createdTask: TaskI) => {
        console.log('Tâche créée:', createdTask);
        this.loadTasks();
        this.loadProgress();
        this.toggleTaskForm();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error creating task', err);
        alert('Erreur lors de la création de la tâche');
        this.isCreating = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleComplete(taskId: number | undefined): void {
    if (!taskId) return;
    
    console.log('Toggle complete pour task:', taskId);
    
    this.taskService.markCompleted(taskId).subscribe({
      next: () => {
        console.log('Tâche marquée comme complétée');
        this.loadTasks();
        this.loadProgress();
      },
      error: (err: HttpErrorResponse) => console.error('Error updating task', err)
    });
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get totalTasksCount(): number {   
    return this.tasks.length;
  }

  deleteTask(taskId: number | undefined): void {
    if (!taskId) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      console.log('Suppression de la tâche:', taskId);
      
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log('Tâche supprimée');
          this.loadTasks();
          this.loadProgress();
        },
        error: (err: HttpErrorResponse) => console.error('Error deleting task', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}