import { Component, inject, OnInit, signal } from '@angular/core';
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
  public visible: boolean = false //variable para ver la contraseña

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

    this.cargando = true

    if (!this._auth.validarCampos(this.loginForm)) {
      this.cargando = false
      return
    }
    
    try {

      const data = this.loginForm.value
      const response: any = await lastValueFrom(this._auth.login(data))

      localStorage.setItem('token', JSON.stringify(response.token))
      localStorage.setItem('usuario', JSON.stringify(response.email))
      this.cargando = false
      this._router.navigate(response.cargo)

    } catch (error: any) {
      this.cargando = false

      if (error.status == 0) {
        this._mensajeria.presentarAlerta('Ha ocurrido un error, intente mas tarde!')
        return
      }

      this._mensajeria.presentarAlerta(error.error.message)
    }
  }

  validarCampo(nombre: string) {
    return this._auth.validarCampo(this.loginForm, nombre)
  }

  verPasword() {
    if (!this.visible) {
      this.visible = true
    } else {
      this.visible = false
    }
  }





}
