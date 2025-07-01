import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './components/login/login';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [
    Login
  ],
  imports: [SharedModule, AuthRoutingModule]
})
export class AuthModule { }
