import { Component, OnInit } from '@angular/core';
import { AtencionService } from '../../../services/atencion/atencion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  atencionForm!: FormGroup
  atenciones: any = []
  medicos: any = []

  constructor(private _atencion: AtencionService, private fb: FormBuilder, private _mensajeria: MensajeriaService, private _router: Router, private _auth: AuthService) {
    this.atencionForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
    this.traerAtenciones()
    this.traerMedicos()
  }

  async traerAtenciones() {

    try {

      const response: any = await lastValueFrom(this._atencion.traerAtenciones())
      console.log(response.atenciones)
      this.atenciones = response.atenciones

    } catch (error: any) {
      console.log(error)
    }

  }

  async traerAtencion(id: number) {

    try {

      const response: any = await lastValueFrom(this._atencion.traerAtencion(id))
      console.log(response)
      document.querySelector("#id-form-atencion")!.textContent = response.resAtencion.id
      document.querySelector("#descripcion-form-atencion")!.textContent = response.resAtencion.descripcion
      document.querySelector("#victimas-form-atencion")!.textContent = response.resAtencion.victimas
      document.querySelector("#fecha-form-atencion")!.textContent = response.resAtencion.fecha
      document.querySelector("#medico-form-atencion")!.textContent = response.resAtencion.medico



    } catch (error) {

    }

  }

  async traerMedicos() {

    try {
      const response: any = await lastValueFrom(this._atencion.traerMedicos())

      console.log(response.medicos)


      this.medicos = response.medicos
    } catch (error: any) {

      console.log(error)

    }

  }

  asignarMedico() {

    if (!this._auth.validarCampos(this.atencionForm)) {
      return
    }
  }


  refrescarPage() {
    this._router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/admin'])
    })
  }



  async mostrarDetallesAtencion(id: number) {

    try {

      const response: any = await lastValueFrom(this._atencion.traerAtencion(id))
      console.log(response.resAtencion)
      document.querySelector("#id-atencion")!.textContent = response.resAtencion.id
      document.querySelector("#descripcion-atencion")!.textContent = response.resAtencion.descripcion
      document.querySelector("#victimas-atencion")!.textContent = response.resAtencion.victimas
      document.querySelector("#fecha-atencion")!.textContent = response.resAtencion.fecha
      document.querySelector("#medico-atencion")!.textContent = response.resAtencion.medico

    } catch (error) {

      console.log(error)

    }

  }


}
