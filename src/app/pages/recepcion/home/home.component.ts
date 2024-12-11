import { Component, inject, OnInit } from '@angular/core';
import { EmergenciasService } from '../../../services/emergencia/emergencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { emergencia } from '../../../models/modelos';

@Component({
  selector: 'app-recepcion-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public emergencias!: emergencia[]
  public columnas: string[] = ['id', 'descripcion', 'victimas']

  private _fb = inject(FormBuilder)
  private _auth = inject(AuthService)
  private _emergencia = inject(EmergenciasService)
  private _mensajeria = inject(MensajeriaService)

  public recepcionForm: FormGroup = this._fb.group({
    descripcion: ['', Validators.required],
    victimas: ['', Validators.required]
  })


  ngOnInit() {
    this._auth.verificarToken()
    this.traerEmergencias()
  }

  async AgregarEmergencia() {
    if (!this._auth.validarCampos(this.recepcionForm)) {
      return
    }

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0')
    const dia = String(fechaActual.getDate()).padStart(2, '0')

    try {
      const data = {
        descripcion: this.recepcionForm.get('descripcion')?.value,
        victimas: this.recepcionForm.get('victimas')?.value.toString(),
        fecha: `${dia}/${mes}/${anio}`
      }
      const response: any = await lastValueFrom(this._emergencia.crearEmergencia(data))
      const response2: any = await lastValueFrom(this._emergencia.traerEmergencias())
      this.emergencias = response2.emergencias
      this._mensajeria.presentarAlertaSucess(response.message)

    } catch (error: any) {
      this._mensajeria.presentarAlerta('Ha ocurrido un error! intente mas tarde!')
    }
  }

  private async traerEmergencias() {
    try {
      const response: any = await lastValueFrom(this._emergencia.traerEmergencias())
      this.emergencias = response.emergencias
    } catch (error: any) {
      console.log(error)
    }
  }

}