import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({"projectId":"ng-task-18-489d4","appId":"1:35539539658:web:681bb033019858b7884633","storageBucket":"ng-task-18-489d4.firebasestorage.app","apiKey":"AIzaSyBKaCiLCBpWTKRheoGx-iSFf7Yw0jtULgI","authDomain":"ng-task-18-489d4.firebaseapp.com","messagingSenderId":"35539539658"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
