import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { TaskFormComponent } from '../task-form/task-form.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipListbox, MatChipsModule} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {CommonModule, DatePipe, NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    FormsModule,
    MatCheckbox,
    NgClass,
    MatIcon,
    NgIf,
    MatProgressSpinner,
    MatFormField,
    MatToolbar,
    MatChipsModule,
    MatIconButton,
    MatButton,
    MatInput,
    MatLabel
  ],
  animations: [
    trigger('taskAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(20px)', opacity: 0 }))
      ])
    ])
  ]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = false;
  searchTerm = '';
  currentFilter = 'all';

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filterTasks();
        this.isLoading = false;
      },
      error: (err) => {
        this.showErrorMessage('Erro ao carregar tarefas', err);
        this.isLoading = false;
      }
    });
  }

  filterTasks(): void {
    let filtered = this.tasks;

    // Filter by search term
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search)
      );
    }

    // Filter by status
    switch (this.currentFilter) {
      case 'active':
        filtered = filtered.filter(task => task.status !== 'CONCLUIDA');
        break;
      case 'completed':
        filtered = filtered.filter(task => task.status === 'CONCLUIDA');
        break;
    }

    this.filteredTasks = filtered;
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: task ? { ...task } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTasks();
        this.showSuccessMessage(task ? 'Tarefa atualizada' : 'Tarefa criada');
      }
    });
  }

  confirmDelete(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: `Deseja realmente excluir a tarefa "${task.title}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task.id);
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.fetchTasks();
        this.showSuccessMessage('Tarefa excluída');
      },
      error: (err) => this.showErrorMessage('Erro ao excluir tarefa', err)
    });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe({
      next: () => {
        this.fetchTasks();
        this.showSuccessMessage('Status da tarefa atualizado');
      },
      error: (err) => this.showErrorMessage('Erro ao atualizar tarefa', err)
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'alta': return 'warn';
      case 'média': return 'accent';
      default: return 'primary';
    }
  }

  getEmptyStateMessage(): string {
    if (this.searchTerm) {
      return 'Nenhuma tarefa corresponde à sua busca';
    }
    switch (this.currentFilter) {
      case 'active': return 'Não há tarefas pendentes';
      case 'completed': return 'Não há tarefas concluídas';
      default: return 'Clique no botão abaixo para criar sua primeira tarefa';
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string, err: any): void {
    this.snackBar.open(`${message}: ${err.error?.message || 'Erro desconhecido'}`, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
