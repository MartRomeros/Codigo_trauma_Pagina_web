import { Component, inject, OnInit } from '@angular/core';
import { AtencionService } from '../../../services/atencion/atencion.service';
import { lastValueFrom } from 'rxjs';
import { atencion, personal } from '../../../models/modelos';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeMedicComponent implements OnInit {

  public atencion?: atencion
  public medico?: personal

  private fb: FormBuilder = inject(FormBuilder)
  public medicoForm!: FormGroup
  private _atencion = inject(AtencionService)
  private _personal = inject(AuthService)
  private _router = inject(Router)
  private email = JSON.parse(localStorage.getItem('usuario')!)
  private confirmar?: boolean



  constructor() {
    this.medicoForm = this.fb.group({
      estado: ['En progreso']
    })
  }

  async ngOnInit() {
    try {
      const response: any = await lastValueFrom(this._atencion.traerAtencionByMedico(this.email))
      this.atencion = response[0]
      const medico: any = await lastValueFrom(this._personal.traerPersonalByEmail(this.email))
      this.medico = medico
    } catch (error: any) {
      console.log(error)
    }
  }

  private async traerAtencionByMedico() {
    try {
      const response: any = await lastValueFrom(this._atencion.traerAtencionByMedico(this.email))
      this.atencion = response[0]
      const medico: any = await lastValueFrom(this._personal.traerPersonalByEmail(this.email))
      this.medico = medico
    } catch (error: any) {
      console.log(error)
    }
  }

  async resolverAtencion() {

    await Swal.fire({
      title: "Estas seguro de los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar estado",
      denyButtonText: `No confirmar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmar = true
      } else if (result.isDenied) {
        this.confirmar = false
      }
    });

    if (!this.confirmar) {
      Swal.fire("Cambios no guardados!", "", "info")
      return
    }

    if (this.medicoForm.get('estado')?.value != 'Resuelta') {
      Swal.fire("Cambios guardados!", "", "success")
      return
    }


    await lastValueFrom(this._atencion.actualizarEstado(this.atencion!.id, this.medicoForm.get('estado')?.value))
    await lastValueFrom(this._atencion.cambiarDisponibilidad(this.medico!.id, 'Disponible'))
    const response: any = await lastValueFrom(this._atencion.traerAtencionByMedico(this.email))
    this.atencion = response[0]

    Swal.fire("Cambios guardados!", "", "success")
  }

  async refrescar() {
    try {
      const response: any = await lastValueFrom(this._atencion.traerAtencionByMedico(this.email))
      this.atencion = response[0]
      const medico: any = await lastValueFrom(this._personal.traerPersonalByEmail(this.email))
      this.medico = medico
    } catch (error: any) {
      console.log(error)
    }
  }



}
