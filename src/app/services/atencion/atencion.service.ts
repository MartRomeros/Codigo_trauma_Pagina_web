import { Injectable } from '@angular/core';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  baseUrlPrueba: string = 'http://localhost:3000/'
  baseUrlProduccion: string = 'https://codigotraumabackend-production.up.railway.app/'

  constructor(private _mensajeria: MensajeriaService, private _http: HttpClient, private _router: Router) { }



  traerAtenciones(): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._http.get(this.baseUrlProduccion + 'atencion/atenciones', { headers })

  }

  traerAtencion(id: number): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const params = new HttpParams().set('number', id.toString())

    return this._http.get(this.baseUrlProduccion + `atencion/atenciones/${id}`, { headers, params })

  }

  traerMedicos(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this._http.get(this.baseUrlProduccion + 'auth/medicos')
  }

  async asignarAtencion(id: number, estado: string, correo: string) {

    const data = { estado: estado }
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    try {

      await firstValueFrom(this._http.put(this.baseUrlProduccion + `atencion/editarestado/${id}`, data, { headers }))
      console.log("estado de la atencion cambiado!")
      await firstValueFrom(this._http.put(this.baseUrlProduccion + `atencion/editaremail/${id}`, correo, { headers }))
      console.log("correo de la atencion cambiado!")
      await firstValueFrom(this._http.put(this.baseUrlProduccion + `auth/estado/${correo}`, 'No disponible', { headers }))
      console.log("disponibilidad del medico cambiada!")
      const asunto = {
        correo: correo,
        asunto: "Atencion de una emergencia",
        mensaje: "Se le ha solicitado atender una emergencia!"
      }
      await firstValueFrom(this._http.post(this.baseUrlProduccion + "mensajeria/enviaremergencia", asunto))
      console.log("correo enviado al medico!")
      this._mensajeria.presentarAlertaSucess('Emergencia Abordada!')

    } catch (error) {
      console.log(error)
    }

  }

  traerAtencionByMedico(correo: string): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this._http.get(this.baseUrlProduccion + `atencion/atencionesbyemail/${correo}`,{headers})

  }

}
