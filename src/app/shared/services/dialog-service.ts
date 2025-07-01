import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialog } from '../components/message-dialog/message-dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialog = inject(MatDialog);

  constructor() { }

  open(title: string, message: string) {
    this.dialog.open(MessageDialog, { data: { title, message } });
  }
}
