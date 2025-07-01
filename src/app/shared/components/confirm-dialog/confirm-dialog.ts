import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  confirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
