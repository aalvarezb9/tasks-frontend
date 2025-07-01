import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  standalone: false,
  templateUrl: './message-dialog.html',
  styleUrl: './message-dialog.scss'
})
export class MessageDialog {

  data = inject<{ title: string, message: string }>(MAT_DIALOG_DATA);
  ref = inject(MatDialogRef<MessageDialog>);

}
