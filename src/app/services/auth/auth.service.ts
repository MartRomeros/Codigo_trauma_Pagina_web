import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://codigotraumabackend-production.up.railway.app/'
  baseForgotPassword:string = 'https://myths.cl/api/reset_password.php'

  constructor(private client: HttpClient, private router: Router) { }

  registrar(data: any): Observable<any> {

    return this.client.post(this.baseUrl + 'auth/registro', data)

  }

  login(data: any): Observable<any> {

    return this.client.post(this.baseUrl + 'auth/login', data)

  }

  verificarTipoUsuario(tipoUsuario: string) {

    switch (tipoUsuario) {
      case 'recepcionista':
        this.router.navigate(['recepcion'])
        break;

      default:
        break;
    }

  }

  recuperarContraseña(){

  }

}
