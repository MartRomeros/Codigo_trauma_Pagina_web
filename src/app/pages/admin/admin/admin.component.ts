import { Component, inject, OnInit } from '@angular/core';
import { AtencionService } from '../../../services/atencion/atencion.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { atencion, personal } from '../../../models/modelos';
import Swal from 'sweetalert2';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  public atenciones: atencion[] = []
  public columnas: string[] = ['id', 'estado', 'opciones']
  public medicos: any = []


  private idMedico?: string
  private idAtencion?: number
  private atencion?: atencion
  private medico?: personal
  private _atencion = inject(AtencionService)
  private _auth = inject(AuthService)
  private _router = inject(Router)
  private _mensajeria = inject(MensajeriaService)


  ngOnInit(): void {
    this.traerAtencionesVigentes()
    this.traerMedicosVigentes()
  }

  async mostrarDetalles(id: number) {
    try {
      const response: any = await lastValueFrom(this._atencion.traerAtencion(id))
      Swal.fire({
        title: "Informacion sobre la emergencia",
        icon: "info",
        html: `
        <ul>
          <li>Id: ${response.resAtencion.id}</li>
          <li>Descripcion: ${response.resAtencion.descripcion}</li>
          <li>Estado: ${response.resAtencion.estado}</li>
          <li>Fecha: ${response.resAtencion.fecha}</li>
          <li>Medico: ${response.resAtencion.medico}</li>
          <li>Victimas involucradas: ${response.resAtencion.victimas}</li>
        </ul>
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `Aceptar`,
        confirmButtonAriaLabel: "Thumbs up, great!"
      })
    } catch (error: any) {
    }
  }

  async traerAtencionesVigentes() {
    try {
      const response: any = await lastValueFrom(this._atencion.traerAtencionesVigentes())
      this.atenciones = response
    } catch (error: any) {
      this._mensajeria.presentarAlerta('Ha ocurrido un error')
    }
  }

  async traerMedicosVigentes() {
    try {
      const response: any = await lastValueFrom(this._atencion.traerMedicosVigentes())
      this.medicos = response.medicos
    } catch (error: any) {
    }
  }

  async solicitarAtencion() {
    try {
      //traemos la atencion a actualizar!
      this.atencion = await lastValueFrom(this._atencion.traerAtencion(this.idAtencion!))
      //traemos el medico que se encargara de la atencion
      this.medico = await lastValueFrom(this._auth.traerPersonalByEmail(this.idMedico!))
      if (this.medico?.disponibilidad != 'Disponible') {
        this._mensajeria.presentarAlerta('Medico no disponible!')
        return
      }
      console.log(this.medico)
      //actualizar estado de la atencion!
      const response: any = await lastValueFrom(this._atencion.actualizarEstado(this.idAtencion!, 'En progreso'))
      //asignarMedico
      const response1: any = await lastValueFrom(this._atencion.asignarMedico(this.idAtencion!, this.medico!.email))
      //cambiar estado del medico
      const response2: any = await lastValueFrom(this._atencion.cambiarDisponibilidad(this.medico!.id, 'Ocupado'))
      //cambiar la lista de medicos
      await lastValueFrom(this._atencion.traerMedicosVigentes())
      //notificar
      const response3: any = await lastValueFrom(this._atencion.notificarPorCorreo(this.idAtencion!, this.idMedico!, this.medico!.fono.toString()))
      //mostrarAlerta
      this._mensajeria.presentarAlertaSucess('Emergencia abordada!')
      this.refrescarPage()

    } catch (error: any) {
    }
  }

  //con las dos variables auxliliares debemos asignarle estos valores de las funciones
  traerMedico(email: string) {
    this.idMedico = email
  }

  traerAtencion(id: number) {
    this.idAtencion = id
  }

  refrescarPage() {
    this._router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/admin'])
    })
  }

  async refrescar() {
    try {
      const response: any = await lastValueFrom(this._atencion.traerAtencionesVigentes())
      this.atenciones = response
    } catch (error: any) {
      this._mensajeria.presentarAlerta('Ha ocurrido un error')
    }
    try {
      const response: any = await lastValueFrom(this._atencion.traerMedicosVigentes())
      this.medicos = response.medicos
    } catch (error: any) {
    }
  }


}
