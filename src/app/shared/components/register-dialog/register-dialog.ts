import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  standalone: false,
  templateUrl: './register-dialog.html',
  styleUrl: './register-dialog.scss'
})
export class RegisterDialog {

  private readonly fb = inject(FormBuilder);

  data = inject<{ email: string }>(MAT_DIALOG_DATA);

  form = this.fb.group(
    {
      email: [this.data.email, [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required]],
      repeat: ['', Validators.required]
    },
    { validators: g => (g.value.password === g.value.repeat ? null : { mismatch: true }) }
  );

}
