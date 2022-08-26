import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from '../../../effects/auth.effect';
import { AuthReducer } from '../../../reudcers/auth.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/app/material.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // MaterialExampleModule,
    // StoreModule.forRoot({
    //   auth: AuthReducer,
    // }, {}),
    // EffectsModule.forRoot([authEffects]),
  ]
})
export class LoginModule { }
