import {Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  // Adicionar outras rotas conforme necessário...
  { path: '**', redirectTo: '/tasks' }
];
