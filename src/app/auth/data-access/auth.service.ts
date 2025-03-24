import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

export interface User {
  email: any;
  password: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = inject(Auth)

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
      );
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(
      this._auth, 
      user.email, 
      user.password
    );
  }

}
