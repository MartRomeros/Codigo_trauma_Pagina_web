import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup
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


    this.cargando = false

  }



  login() {
    const data: any = {
      email: this.loginForm.get('correo')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.cargando = true
    this._auth.login(data)
    this.cargando = false
  }

  validarCampo(nombre: string) {
    return this._auth.validarCampo(this.loginForm, nombre)
  }





}
