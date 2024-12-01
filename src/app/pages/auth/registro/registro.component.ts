import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  public visible: boolean = false //variable para ver la contraseña
  public cargos: any[] = []
  public cargando?: boolean

  private _formBuilder = inject(FormBuilder);
  private _auth = inject(AuthService)
  private _mensajeria = inject(MensajeriaService)
  private _router = inject(Router)

  public datosPersonalesForm = this._formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fono: ['', Validators.required],
  })

  public registroForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cargo: ['', Validators.required]
  });

  isLinear = false;

  ngOnInit(): void {
    this.traerCargos()
  }

  verPasword() {
    if (!this.visible) {
      this.visible = true
    } else {
      this.visible = false
    }
  }

  async traerCargos() {
    try {
      const response: any = await lastValueFrom(this._auth.traerCargos())
      this.cargos = response.cargos
    } catch (error: any) {
      console.log(error)
    }
  }

  async registrar() {
    this.cargando = true
    if (!this._auth.validarCampos(this.registroForm) || !this._auth.validarCampos(this.datosPersonalesForm)) {
      this.cargando = false
      return
    }
    const data: any = { ...this.datosPersonalesForm.value, ...this.registroForm.value }
    try {
      const response: any = await lastValueFrom(this._auth.registrar(data))
      this._mensajeria.presentarAlertaSucess(response.message)
      this.cargando = false
      this._router.navigate(['login'])

    } catch (error: any) {
      this._mensajeria.presentarAlerta(error.error.message)
      this.cargando = false

    }
  }

}
