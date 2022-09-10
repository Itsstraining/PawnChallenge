import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-invite',
  templateUrl: './dialog-invite.component.html',
  styleUrls: ['./dialog-invite.component.scss']
})
export class DialogInviteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public nameInvite:string,private dialogRef: MatDialogRef<DialogInviteComponent>,) {
    console.log('alo')
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
  accept() {
    this.dialogRef.close({ isAccept: true })
  }
}
