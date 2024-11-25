import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  public cargando?: boolean
  public tipoUsuario?: string

  private _auth = inject(AuthService)
  private _fb = inject(FormBuilder)
  private _mensajeria = inject(MensajeriaService)
  private _router = inject(Router)


  constructor() {

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    if (!localStorage.getItem('usuario')) {
      this._router.navigate(['login'])
    }
    if (!localStorage.getItem('token')) {
      this._router.navigate(['login'])
    }
  }



  async login() {
    if (!this._auth.validarCampos(this.loginForm)) {
      return
    }
    try {
      const data = this.loginForm.value
      const response: any = await lastValueFrom(this._auth.login(data))

      localStorage.setItem('token', JSON.stringify(response.token))
      localStorage.setItem('usuario', JSON.stringify(response.user.email))

      switch (response.user.cargo) {
        case 1:
          this._router.navigate(['recepcion'])
          break;
        case 2:
          this._router.navigate(['admin'])
          break;
        case 3:
          this._router.navigate(['medico'])
          break;

        default:
          break;
      }

      console.log(response)
    } catch (error: any) {
      this._mensajeria.presentarAlerta(error.error.message)
    }
  }

  validarCampo(nombre: string) {
    return this._auth.validarCampo(this.loginForm, nombre)
  }





}
