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

}
