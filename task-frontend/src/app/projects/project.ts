import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{ProjectI} from '../projects/project.model'
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class Project {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

   createProject(project: ProjectI): Observable<ProjectI> {
    return this.http.post<ProjectI>(this.apiUrl, project, { headers: this.getHeaders() });
  }

  getUserProjects(): Observable<ProjectI[]> {
    return this.http.get<ProjectI[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getProject(projectId: number): Observable<ProjectI> {
    return this.http.get<ProjectI>(`${this.apiUrl}/${projectId}`, { headers: this.getHeaders() });
  }

  getProgress(projectId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${projectId}/progress`, { headers: this.getHeaders() });
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers: this.getHeaders(),
      responseType: 'text'  
    }).pipe(
      map(() => void 0)  
    );
  }
}

