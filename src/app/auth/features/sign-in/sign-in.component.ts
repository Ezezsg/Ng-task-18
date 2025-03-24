import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { isRequired, hasEmailError } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { Router, RouterLink } from '@angular/router';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;  
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export default class SignInComponent {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }
  
  hasEmailError() {
    return hasEmailError(this.form);
  }
  
  
  form = this._formBuilder.group<any>({
    email: this._formBuilder.control('', [
      Validators.required, 
      Validators.email
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  
  
  async submit(){
    if(this.form.invalid) return;
  
    try{
      const {email, password} = this.form.value;
  
      if( !email || !password) return;
  
      console.log({email, password}); //para ver que trae.
      await this._authService.signIn({email, password});
  
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      console.log(error);
    }
  }
}
