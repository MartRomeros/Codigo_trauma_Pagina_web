import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent implements OnInit {

  loginForm?: any
  cargando?: boolean
  tipoUsuario?: string


  constructor(private _auth: AuthService, private fb: FormBuilder, private mensajeria: MensajeriaService, private router: Router) {

    this.loginForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    if (!localStorage.getItem('usuario')) {
      this.router.navigate(['login'])
    }

    if (!localStorage.getItem('token')) {
      this.router.navigate(['login'])
    }

    this._auth.verificarTipoUsuario(JSON.parse(localStorage.getItem('usuario') || '[]'))

  }



  login() {

    if (!this.validarCampos()) {
      return
    }

    this.cargando = false

    const data = {

      email: this.loginForm.get('correo').value,
      password: this.loginForm.get('password').value,

    }

    this._auth.login(data).subscribe({
      next: (data) => {
        this.tipoUsuario = data.user.cargo
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('usuario', JSON.stringify(data.user.cargo))
        this._auth.verificarTipoUsuario(this.tipoUsuario!)
      },
      error: (err: any) => {
        this.mensajeria.presentarAlerta(err.error.message)
      }
    })

  }

  validarCampo(nombre: string): boolean {
    return this.loginForm.get(nombre).errors && this.loginForm.get(nombre).touched
  }

  validarCampos(): boolean {

    const campos = Object.keys(this.loginForm.controls)

    for (let index = 0; index < campos.length; index++) {
      const campo = this.loginForm.get(campos[index])
      if (campo.errors) {
        this.cargando = false
        this.mensajeria.presentarAlerta('Verifica los campos!')
        return false
      }
    }
    return true
  }





}
