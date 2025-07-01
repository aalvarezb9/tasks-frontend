import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category, CategoryService } from '../../../shared/services/category-service';

@Component({
  selector: 'app-create-category-dialog',
  standalone: false,
  templateUrl: './create-category-dialog.html',
  styleUrl: './create-category-dialog.scss'
})
export class CreateCategoryDialog {

  private readonly fb = inject(FormBuilder);
  private ref = inject(MatDialogRef<CreateCategoryDialog>);
  private readonly categoryService = inject(CategoryService);

  form = this.fb.group({
    name: ['', Validators.required],
    color: ['#000000', Validators.required]
  });

  save(): void {
    if (this.form.invalid) return;
    this.categoryService.create(this.form.value as Partial<Category>).subscribe((cat) => this.ref.close(cat));
  }

}
