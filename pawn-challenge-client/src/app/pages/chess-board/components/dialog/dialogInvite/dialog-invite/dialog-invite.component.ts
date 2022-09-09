import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-invite',
  templateUrl: './dialog-invite.component.html',
  styleUrls: ['./dialog-invite.component.scss']
})
export class DialogInviteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogInviteComponent>,) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
  accept() {
    this.dialogRef.close({ isAccept: true })
  }
}
