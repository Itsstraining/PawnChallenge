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
import { MaterialModule } from './material.module';
import { DialogSkinComponent } from './components/dialogSkin/dialog-skin/dialog-skin.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
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
import { FormsModule } from '@angular/forms';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { LoginComponent } from './pages/home/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './RxJs/effects/auth.effect';
import { DialogLoseComponent } from './components/dialog-lose/dialog-lose.component';
import { DialogWinComponent } from './components/dialog-win/dialog-win.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { RegisterComponent } from './pages/home/register/register.component';
import { OnlineComponent } from './pages/home/components/play-chesss/online/online.component';
import { LearnComponent } from './pages/home/components/learn/learn.component';
import { PlayChesssComponent } from './pages/home/components/play-chesss/play-chesss.component';
import { AngularFireModule } from '@angular/fire/compat';
import { authReducer } from './RxJs/reudcers/auth.reducer';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
// service


@NgModule({
  declarations: [
    AppComponent, 
    DialogComponent, 
    DialogSkinComponent,
    DialogLoseComponent,
    DialogWinComponent,
    HomePagesComponent,
    LoginComponent,
    PlayChesssComponent,
    LearnComponent,
    OnlineComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MaterialModule,
    FontAwesomeModule,
    FormsModule,
    StoreModule.forRoot({
      auth: authReducer,
    }, {}),
    EffectsModule.forRoot([authEffects,]),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [
  ],
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
