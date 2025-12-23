import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../auth/auth';
import { ProjectI } from '../project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProjectList implements OnInit {
  projects: ProjectI[] = [];
  loading = false;

  constructor(
    private projectService: Project,
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef  // <-- AJOUTEZ CECI
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.getUserProjects().subscribe({
      next: (data) => {
        console.log('Projets reçus:', data);
        console.log('isArray =', Array.isArray(data));
        console.log('keys =', Object.keys(data as any));
        
        // Assurez-vous que c'est bien un tableau
        this.projects = Array.isArray(data) ? data : [];
        this.loading = false;
        
        // FORCEZ la détection de changement
        this.cdr.detectChanges();
        
        console.log('projects.length après assignation:', this.projects.length);
      },
      error: (err) => {
        console.error('Error loading projects', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteProject(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (err) => console.error('Error deleting project', err)
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}