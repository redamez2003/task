import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { ProjectDetail } from './projects/project-detail/project-detail';
import { ProjectList } from './projects/project-list/project-list';
import { ProjectForm } from './projects/project-form/project-form';

export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'projects', component: ProjectList },

  { path: 'projects/new', component: ProjectForm },

  { path: 'projects/:id', component: ProjectDetail },
];

