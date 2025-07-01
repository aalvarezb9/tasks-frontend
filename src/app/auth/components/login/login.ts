import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../shared/services/user-service';
import { finalize, switchMap } from 'rxjs';
import { RegisterDialog } from '../../../shared/components/register-dialog/register-dialog';
import { DialogService } from '../../../shared/services/dialog-service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly dialogService = inject(DialogService);

  loading = signal(false);

  constructor() {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading.set(true);
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => {
          this.loading.set(false);
          this.createUser(email);
        },
      });
  }

  createUser(email?: string): void {
    const ref = this.dialog.open(RegisterDialog, { data: { email } });
    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loading.set(true);
      this.userService
        .register(result.email, result.name, result.password)
        .subscribe({
          next: (user: User) => {
            this.authService.login(user.email, result.password).subscribe({
              next: () => this.router.navigate(['/tasks']),
              error: (err) => {
                this.loading.set(false);
              },
            });
          },
        });
    });
  }
}
