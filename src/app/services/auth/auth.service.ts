import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://codigotraumabackend-production.up.railway.app/'

  constructor(private client: HttpClient) { }

  registrar(data: any): Observable<any> {

    return this.client.post(this.baseUrl + 'auth/registro', data)

  }

  login(data: any): Observable<any> {

    return this.client.post(this.baseUrl + 'auth/login', data)

  }

}
