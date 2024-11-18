import { Component, OnInit } from '@angular/core';
import { EmergenciasService } from '../../../services/emergencia/emergencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recepcion-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recepcionForm!: FormGroup
  emergencias?: any[] = []
  descripcion?: string;
  victimas?: number
  fechaActual: Date = new Date()
  fecha: string = this.fechaActual.getDate() + '/' + (this.fechaActual.getMonth() + 1) + '/' + this.fechaActual.getFullYear()

  constructor(
    private _emergencia: EmergenciasService,
    private fb: FormBuilder,
    private mensajeria: MensajeriaService,
    private _auth: AuthService,
    private _http: HttpClient
  ) {
    this.recepcionForm = fb.group({
      cantidadVictimas: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this._auth.verificarToken()
    this.traerEmergencias()
  }

  async AgregarEmergencia() {

    this.descripcion = this.recepcionForm.get('descripcion')?.value
    this.victimas = this.recepcionForm.get('cantidadVictimas')?.value

    if (!this.descripcion || this.descripcion.length < 5) {
      this.mensajeria.presentarAlerta('La descripción es obligatoria y debe tener al menos 5 caracteres.')
      return;
    }

    if (!this.victimas || this.victimas <= 0) {
      this.mensajeria.presentarAlerta('La cantidad de victimas es obligatoria')
      return;
    }

    const data = {
      descripcion: this.descripcion,
      victimas: this.victimas,
      fecha: this.fecha
    }

    try {

      await lastValueFrom(this._emergencia.crearEmergencia(data))
      const response: any = await lastValueFrom(this._emergencia.traerEmergencias())
      this.emergencias = response.emergencias

    } catch (error) {

      console.log(error)

    }


  }

  async traerEmergencias() {

    try {

      const response: any = await lastValueFrom(this._emergencia.traerEmergencias())
      this.emergencias = response.emergencias

    } catch (error: any) {

      console.log(error)

    }

  }

}