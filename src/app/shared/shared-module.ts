import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDialog } from './components/message-dialog/message-dialog';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog';
import { RegisterDialog } from './components/register-dialog/register-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

const mat = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatCheckboxModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSpinner,
  ReactiveFormsModule,
  MatSelectModule
];

@NgModule({
  declarations: [MessageDialog, ConfirmDialog, RegisterDialog],
  imports: [CommonModule, ReactiveFormsModule, ...mat],
  exports: [CommonModule, ReactiveFormsModule, MessageDialog, ConfirmDialog, RegisterDialog, ...mat]
})
export class SharedModule { }
