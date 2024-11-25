import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlLocal: string = 'http://localhost:3000'
  private urlFenna: string = 'https://myths.cl/api/reset_password.php' //endpoint de la api del feña para notificar al usuario por correo el cambio de clave
  private _http = inject(HttpClient)


  constructor(private client: HttpClient, private router: Router, private mensajeria: MensajeriaService) { }

  validarCampos(formulario: FormGroup): boolean {
    const campos = Object.keys(formulario.controls)
    for (let i = 0; i < campos.length; i++) {
      const campo = formulario.get(campos[i])
      if (campo?.errors) {
        this.mensajeria.presentarAlerta(`el campo ${campos[i]} presenta un error`)
        return false
      }
    }
    return true;
  }

  validarCampo(formulario: FormGroup, nombre: string): string {
    if (formulario.get(nombre)?.hasError('required') && formulario.get(nombre)?.touched) {
      return 'Campo requerido!'

    } else if (formulario.get(nombre)?.hasError('email') && formulario.get(nombre)?.touched) {
      return 'Formato invalido!'

    } else {
      return ''
    }

  }

  registrar(data: any): Observable<any> {
    return this._http.post(`${this.urlLocal}/personal/registro`, data)
  }

  traerCargos(): Observable<any> {
    return this._http.get(`${this.urlLocal}/cargo/all_cargos`)
  }

  login(data: any): Observable<any> {
    return this.client.post(`${this.urlLocal}/personal/login`, data)
  }

  traerPersonalByEmail(correo: string): Observable<any> {
    return this._http.get(`${this.urlLocal}/personal/${correo}`)
  }

  actualizarPassword(correo: string, data: any): Observable<any> {
    return this._http.put(`${this.urlLocal}/personal/reset_password/${correo}`, data)
  }

  notificarUsuario(data: any): Observable<any> {
    return this._http.post(`${this.urlFenna}`, data)
  }

  verificarToken() {
    if (!localStorage.getItem('token')) {
      this.mensajeria.presentarAlerta('Ha ocurrido un problema!, volveras al inicio de sesión')
      this.logout()
      this.router.navigate(['login'])
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  generarContrasenaUnica(longitud: number = 10): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let caracteresDisponibles = caracteres.split("");
    let contrasena = "";

    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresDisponibles.length);
      contrasena += caracteresDisponibles[indiceAleatorio];

      // Elimina el carácter ya utilizado
      caracteresDisponibles.splice(indiceAleatorio, 1);

      // Si los caracteres disponibles se agotan antes de alcanzar la longitud deseada
      if (caracteresDisponibles.length === 0 && contrasena.length < longitud) {
        throw new Error("No hay suficientes caracteres únicos para generar una contraseña de esta longitud");
      }
    }

    return contrasena;
  }



}
