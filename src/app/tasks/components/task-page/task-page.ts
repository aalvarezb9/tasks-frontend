import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Task } from '../../models/task.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginatedTasks, TasksService } from '../../services/tasks-service';
import { AuthService } from '../../../shared/services/auth-service';
import { TaskStatus } from '../../models/task-status.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CategoryService } from '../../../shared/services/category-service';

@Component({
  selector: 'app-task-page',
  standalone: false,
  templateUrl: './task-page.html',
  styleUrl: './task-page.scss'
})
export class TaskPage implements OnInit {

  private readonly tasksService = inject(TasksService);
  private readonly authService = inject(AuthService);
  private readonly categoryService = inject(CategoryService);
  
  tasks$ = new BehaviorSubject<Task[]>([]);
  pending$ = new BehaviorSubject<Task[]>([]);
  progress$ = new BehaviorSubject<Task[]>([]);
  completed$ = new BehaviorSubject<Task[]>([]);
  pending: Task[] = [];
  progress: Task[] = [];
  completed: Task[] = [];
  total = 0;
  page = 1;
  limit = 10;
  loadingPending = signal(false);
  loadingCompleted = signal(false);

  taskStatus = TaskStatus;

  ngOnInit(): void {
    this.load();
  }

  drop(ev: CdkDragDrop<Task[]>, status: TaskStatus) {
    if (ev.previousContainer === ev.container) {
      moveItemInArray(ev.container.data, ev.previousIndex, ev.currentIndex);
    } else {
      this.pending$.next(this.pending);
      this.progress$.next(this.progress);
      this.completed$.next(this.completed);
    
      const task = ev.container.data[ev.currentIndex];
      this.tasksService.update(task.id!, { status }).subscribe({
        next: () => {
          transferArrayItem(
            ev.previousContainer.data,
            ev.container.data,
            ev.previousIndex,
            ev.currentIndex
          );
        }
      });
    }
  }

  load(): void {
    this.loadingPending.set(true);
    this.loadingCompleted.set(true);
    combineLatest([
      this.tasksService.list(this.page, this.limit),
      this.categoryService.list(this.page, this.limit)
    ]).subscribe(([tResp, cats]) => {
      const map = new Map(cats.categories.map(c => [c.id, c]));
      const tasks = tResp.tasks.map(t => {
        const c = map.get(t.categoryId!);
        return {
          ...t,
          color: c?.color ?? '#ccc',
          categoryName: c?.name
        };
      });
      this.pending = tasks.filter(t => t.status === 'pending');
      this.progress = tasks.filter(t => t.status === 'in-progress');
      this.completed = tasks.filter(t => t.status === 'completed');
      this.pending$.next(this.pending);
      this.loadingPending.set(false);
      this.progress$.next(this.progress);
      this.completed$.next(this.completed);
      this.loadingCompleted.set(false);
    });
  }

  onLogout(): void {
    this.authService.logout();
    location.href = '/login';
  }

}
