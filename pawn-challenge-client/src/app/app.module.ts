import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { DialogComponent } from './components/dialogGamemode/dialog.component';
import { MaterialExampleModule } from './material.module';
import { DialogSkinComponent } from './components/dialogSkin/dialog-skin/dialog-skin.component';

import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faSquare,
  faCheckSquare,
  faCoffee,
  faChess,
  faChessKing,
  faPuzzlePiece,
  faGraduationCap,
  faBinoculars,
  faNewspaper,
  faUserGroup,
  faEllipsis,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
  faLeanpub,
} from '@fortawesome/free-brands-svg-icons';
import { FormsModule } from '@angular/forms';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { LoginComponent } from './pages/home/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './effects/auth.effect';
import { AuthReducer } from './reudcers/auth.reducer';
import { DialogLoseComponent } from './components/dialog-lose/dialog-lose.component';
import { DialogWinComponent } from './components/dialog-win/dialog-win.component';


@NgModule({
  declarations: [AppComponent, DialogComponent, DialogSkinComponent,DialogLoseComponent,DialogWinComponent,HomePagesComponent,LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MaterialExampleModule,
    FontAwesomeModule,
    FormsModule,
    StoreModule.forRoot({
      auth: AuthReducer,
    }, {}),
    EffectsModule.forRoot([authEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
   
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faChess,
      faChessKing,
      faPuzzlePiece,
      faGraduationCap,
      faBinoculars,
      faNewspaper,
      faUserGroup,
      faEllipsis,
      faCaretRight
    );
  }
}
