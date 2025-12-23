import { Component } from '@angular/core';
import { ProjectI } from '../project.model';
import { Project } from '../project';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  standalone: true,          // ✅ OBLIGATOIRE
  imports: [FormsModule],    // ✅ maintenant pris en compte
  templateUrl: './project-form.html',
  styleUrls: ['./project-form.css'], // petite correction aussi
})
export class ProjectForm {

  project: ProjectI = {
    title: '',
    description: ''
  };

  constructor(
    private projectService: Project,
    private router: Router
  ) {}

  onSubmit() {
  this.projectService.createProject(this.project).subscribe({
    next: (createdProject) => {
      this.router.navigate(['/projects', createdProject.id]);
    }
  });
}


  cancel() {
    this.router.navigate(['/projects']);
  }
}
