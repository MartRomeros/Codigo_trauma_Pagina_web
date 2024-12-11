import { Injectable } from '@angular/core';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  private baseUrlPrueba: string = 'http://localhost:3000/'
  private baseUrlProduccion: string = 'https://codigotraumabackend-production.up.railway.app/'

  constructor(private _mensajeria: MensajeriaService, private _http: HttpClient, private _router: Router) { }



  traerAtenciones(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._http.get(this.baseUrlPrueba + 'atencion/atenciones', { headers })
  }

  traerAtencion(id: number): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const params = new HttpParams().set('number', id.toString())
    return this._http.get(this.baseUrlPrueba + `atencion/atenciones/${id}`, { headers, params })
  }

  traerMedicosVigentes(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._http.get(`${this.baseUrlPrueba}personal/medicos_vigentes`, { headers })
  }

  traerAtencionesVigentes(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._http.get(`${this.baseUrlPrueba}atencion/atenciones_vigentes`, { headers })
  }

  actualizarEstado(id: number, estado: string): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const data = { estado: estado }
    return this._http.put(`${this.baseUrlPrueba}atencion/actualizar_estado/${id}`, data, { headers })
  }

  asignarMedico(id: number, email: string): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const data = { medico: email }
    return this._http.put(`${this.baseUrlPrueba}atencion/asignar_medico/${id}`, data, { headers })
  }

  cambiarDisponibilidad(id: number, disponibilidad: string): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const data = { disponibilidad: disponibilidad }
    return this._http.put(`${this.baseUrlPrueba}personal/cambiar_disponibilidad/${id}`, data, { headers })
  }

  notificarPorCorreo(id: number, email: string, fono: string): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const data = { email: email, atencionId: id, fono: fono }
    return this._http.post(`${this.baseUrlPrueba}personal/notificar_por_correo`, data, { headers })
  }

  traerAtencionByMedico(email: string): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._http.get(`${this.baseUrlPrueba}atencion/atenciones/medico/${email}`,{ headers })
  }

}
