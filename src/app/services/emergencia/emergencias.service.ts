import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergenciasService {

  baseUrlPruebas = 'http://localhost:3000/emergencia'
  baseUrlProduccion = 'https://codigotraumabackend-production.up.railway.app/emergencia'

  constructor(private http: HttpClient) { }



  traerEmergencias(): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')

    console.log(token)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get(this.baseUrlPruebas + '/emergencias', { headers })
  }

  crearEmergencia(data: any): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.post(this.baseUrlPruebas + '/crearemergencia', data, { headers })
  }

}