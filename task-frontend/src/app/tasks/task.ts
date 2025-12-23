import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from './task.model';
import { map } from 'rxjs/operators';  


@Injectable({
  providedIn: 'root',
})
export class TaskService {  // <-- Renommé de "Task" à "TaskService"
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProjectTasks(projectId: number): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(`${this.baseUrl}/${projectId}`, { headers: this.getHeaders() });
  }

  createTask(projectId: number, task: TaskI): Observable<TaskI> {
    return this.http.post<TaskI>(`${this.baseUrl}/${projectId}`, task, { headers: this.getHeaders() });
  }

  updateTask(task: TaskI): Observable<TaskI> {
    return this.http.put<TaskI>(`${this.baseUrl}/${task.id}`, task, { headers: this.getHeaders() });
  }

 // task.service.ts
deleteTask(taskId: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${taskId}`, { 
    headers: this.getHeaders(),
    responseType: 'text' as 'json'  // <-- Accepter du texte au lieu de JSON
  }).pipe(
    map(() => void 0)  // Convertir en void
  );
}
  markCompleted(taskId: number): Observable<TaskI> {
    return this.http.put<TaskI>(`${this.baseUrl}/complete/${taskId}`, {}, { headers: this.getHeaders() });
  }
}