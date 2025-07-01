import { Component, inject, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks-service';
import { MatDialog } from '@angular/material/dialog';
import { TaskStatus } from '../../models/task-status.model';
import { EditTask } from '../edit-task/edit-task';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss'
})
export class TaskItem {

  private readonly tasksService = inject(TasksService);
  private readonly dialog = inject(MatDialog);
  
  task = input.required<Task>();
  changed = output<void>();
  deleted = output<void>();
  
  taskStatus = TaskStatus;

  ngOnInit(): void {
  }

  toggleCompleted(checked: boolean): void {
    const status = checked ? TaskStatus.COMPLETED : TaskStatus.PENDING;
    this.tasksService.update(this.task().id, { status }).subscribe({
      next: () => this.changed.emit(),
      error: (err) => console.error(err)
    });
  }

  edit(): void {
    const dialogRef = this.dialog.open(EditTask, { data: { task: this.task() } });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) this.changed.emit();
      },
      error: (err) => console.error(err)
    });
  }

  remove(): void {
    this.tasksService.delete(this.task().id).subscribe({
      next: () => this.deleted.emit(),
      error: (err) => console.error(err)
    });
  }

}
