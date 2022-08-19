import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialogGamemode/dialog.component';
import { DialogSkinComponent } from './components/dialogSkin/dialog-skin/dialog-skin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PawnChallengeClient';
  constructor(public dialog: MatDialog) { }
  openDialogGamemode() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogSkin() {
    const dialogRef = this.dialog.open(DialogSkinComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
