import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TaskPage } from './components/task-page/task-page';
import { TaskForm } from './components/task-form/task-form';
import { TaskItem } from './components/task-item/task-item';
import { EditTask } from './components/edit-task/edit-task';
import { CreateCategoryDialog } from './components/create-category-dialog/create-category-dialog';
import { MatSelectModule } from '@angular/material/select';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TaskPage,
    TaskForm,
    TaskItem,
    EditTask,
    CreateCategoryDialog
  ],
  imports: [
    CommonModule,
    CdkDropListGroup, 
    CdkDropList, 
    CdkDrag,
    TasksRoutingModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class TasksModule { }
