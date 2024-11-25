import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public cargando?: boolean
  public formularioRegistro!: FormGroup
  public cargos?: any[]

  private _fb = inject(FormBuilder)
  private _authService = inject(AuthService)
  private _router = inject(Router)
  private _mensajeria = inject(MensajeriaService)

  constructor() {

    this.formularioRegistro = this._fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      fono: ['', [Validators.required]],
    })

  }

  ngOnInit() {
    this.traerCargos()
  }

  async register() {
    this.cargando = true
    if (!this._authService.validarCampos(this.formularioRegistro)) {
      this.cargando = false
      return
    }
    try {
      const data = this.formularioRegistro.value
      const response: any = await lastValueFrom(this._authService.registrar(data))
      this.cargando = false
      this._mensajeria.presentarAlertaSucess(response.message)
      this._router.navigate(['login'])
    } catch (error: any) {
      this._mensajeria.presentarAlerta(error.error.message)
      this.cargando = false
    }
  }

  validarCampo(nombre: string): string {
    return this._authService.validarCampo(this.formularioRegistro, nombre)
  }

  async traerCargos() {
    try {
      const response: any = await lastValueFrom(this._authService.traerCargos())
      this.cargos = response.cargos
    } catch (error: any) {
      console.log(error)
    }
  }

}
