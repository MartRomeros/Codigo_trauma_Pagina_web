import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent {

  loginForm?: any
  cargando?: boolean
  tipoUsuario?: string

  constructor(private _auth: AuthService, private fb: FormBuilder) {

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
          this.tipoUsuario = data.user.cargo
          this._auth.verificarTipoUsuario(this.tipoUsuario!)
        },
        error: (err) => {
          console.log(err)
        }
      })

    }, 3000);
    this.cargando = true
  }




}
