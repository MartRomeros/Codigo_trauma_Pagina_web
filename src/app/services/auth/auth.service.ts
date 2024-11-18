import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrlPrueba: string = 'http://localhost:3000/'
  baseForgotPassword: string = 'https://myths.cl/api/reset_password.php'
  usuario: any

  constructor(private client: HttpClient, private router: Router, private mensajeria: MensajeriaService) { }

  validarCampo(formulario: FormGroup, nombre: string): string {
    if (formulario.get(nombre)?.hasError('required') && formulario.get(nombre)?.touched) {
      return 'Campo requerido!'

    } else if (formulario.get(nombre)?.hasError('email') && formulario.get(nombre)?.touched) {
      return 'Formato invalido!'

    } else {
      return ''
    }

  }

  async registrar(data: any) {

    try {

      const response1: any = await lastValueFrom(this.client.post(`${this.baseUrlPrueba}personal/registro`, data))
      console.log(response1)
      this.mensajeria.presentarAlertaSucess(response1.message)
      this.router.navigate(['login'])

    } catch (error: any) {

      this.mensajeria.presentarAlerta(error.error.message)
      console.log(error)

    }

  }

  async login(data: any) {

    try {

      const response: any = await lastValueFrom(this.client.post(`${this.baseUrlPrueba}personal/login`, data))
      localStorage.setItem('usuario', JSON.stringify(response.user))
      localStorage.setItem('token', JSON.stringify(response.token))

      switch (response.user.cargo) {
        case 1:
          this.router.navigate(['medico'])
          break;
        case 2:
          this.router.navigate(['recepcion'])
          break;
        case 3:
          this.router.navigate(['admin'])
          break;

        default:
          break;
      }

    } catch (error: any) {

      this.mensajeria.presentarAlerta(error.error.message)

    }

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
