import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks-service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: false,
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.scss'
})
export class EditTask implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly tasksService = inject(TasksService);
  dialogRef = inject(MatDialogRef);
  data = inject<{ task: Task }>(MAT_DIALOG_DATA);

  form!: FormGroup;

  
  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data.task.title, Validators.required],
      description: [this.data.task.description]
    });
  }
  
  save(): void {
    if (this.form.invalid) return;
    this.tasksService.update(this.data.task.id, this.form.value as Partial<Task>).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err)
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
