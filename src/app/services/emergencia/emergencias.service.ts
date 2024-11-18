import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { MensajeriaService } from '../mensajeria/mensajeria.service';

@Injectable({
  providedIn: 'root'
})

export class EmergenciasService {

  baseUrlPruebas = 'http://localhost:3000/emergencia'
  baseUrlProduccion = 'https://codigotraumabackend-production.up.railway.app/emergencia'
  private emergencias: any[] = []

  constructor(private http: HttpClient, private _msj: MensajeriaService) { }

  getEmergencias() {
    return this.emergencias
  }

  setEmergencias(data: any[]) {
    this.emergencias = data
  }

  crearEmergencia(data: any): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    this._msj.presentarAlertaSucess('Emergencia Registrada!')
    return this.http.post(this.baseUrlPruebas + '/generar_emergencia', data, { headers })


  }

  traerEmergencias(): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get(`${this.baseUrlPruebas}/traer_emergencias`, { headers })

  }



}
