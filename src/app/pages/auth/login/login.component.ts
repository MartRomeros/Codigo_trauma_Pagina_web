import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent {

  loginForm: any
  cargando?: boolean

  constructor(private router: Router, private _auth: AuthService, private fb: FormBuilder) {

    this.loginForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }



  login() {
    setTimeout(() => {

      this.cargando = false

      const data = {

        email: this.loginForm.get('correo').value,
        password: this.loginForm.get('password').value,

      }

      this._auth.login(data).subscribe({
        next: (data) => {
          console.log(data)
        },
        error: (err) => {
          console.log(err)
        }
      })

    }, 3000);
    this.cargando = true
  }


}
