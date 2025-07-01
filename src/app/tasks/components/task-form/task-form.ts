import { Component, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category, CategoryService } from '../../../shared/services/category-service';
import { CreateCategoryDialog } from '../create-category-dialog/create-category-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnInit, OnChanges {

  private readonly fb = inject(FormBuilder);
  private readonly tasksService = inject(TasksService);
  private readonly categoryService = inject(CategoryService);
  private readonly dialog = inject(MatDialog);

  task = input<Task | null>(null);

  created = output<void>();
  saved = output<void>();

  categories: Category[] = [];

  form = this.fb.group<{
  title: FormControl<string>;
  description: FormControl<string | null>;
  categoryId: FormControl<string | null>;
}>({
  title: this.fb.control('', { nonNullable: true, validators: Validators.required }),
  description: this.fb.control(null),
  categoryId: this.fb.control(null)
});

  ngOnInit(): void {
    this.categoryService.list().subscribe((categories) => {
      this.categories = categories.categories;
    });
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.task()) this.form.patchValue(this.task()!);
  }

  choose(value: string): void {
    if (value === 'new') {
      const ref = this.dialog.open(CreateCategoryDialog);
      ref.afterClosed().subscribe(result => {
        if (result) {
          this.categories.unshift(result);
          this.form.patchValue({ categoryId: result.id });
        } else {
          this.form.patchValue({ categoryId: '' });
        }
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.value as Partial<Task>;
    const obs = this.task()
      ? this.tasksService.update(this.task()!.id!, dto)
      : this.tasksService.create(dto);
    obs.subscribe(() => {
      this.form.reset();
      this.saved.emit();
    });
  }

}
