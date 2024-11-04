import { Injectable } from '@angular/core';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  baseUrlPrueba: string = 'http://localhost:3000/atencion/'

  constructor(private _mensajeria: MensajeriaService, private _http: HttpClient, private _router: Router) { }



  traerAtenciones(): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._http.get(this.baseUrlPrueba + 'atenciones', { headers })

  }

  traerAtencion(id: number): Observable<any> {

    const token = JSON.parse(localStorage.getItem('token') || '{}')
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const params = new HttpParams().set('number', id.toString())

    return this._http.get(this.baseUrlPrueba + `atenciones/${id}`, { headers, params })

  }

}
