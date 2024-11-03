import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, UnsubscriptionError } from 'rxjs';
import { MensajeriaService } from '../mensajeria/mensajeria.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://codigotraumabackend-production.up.railway.app/'
  baseUrlPrueba: string = 'http://localhost:3000/'
  baseForgotPassword: string = 'https://myths.cl/api/reset_password.php'
  usuario: any

  constructor(private client: HttpClient, private router: Router, private mensajeria: MensajeriaService) { }

  registrar(data: any): Observable<any> {

    return this.client.post(this.baseUrlPrueba + 'auth/registro', data)

  }

  login(data: any): Observable<any> {

    return this.client.post(this.baseUrlPrueba + 'auth/login', data)

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


  recuperarContrasenna(email: string) {

    this.client.get(this.baseUrlPrueba + `auth/user/${email}`).subscribe({
      next: (data) => {

        this.usuario = data
        this.usuario = this.usuario.user

        const nuevaPassword = this.generarContrasenaUnica()
        const dataToUpdate = { password: nuevaPassword }

        console.log("obteniendo usuario y contra nueva!")

        this.client.put(this.baseUrlPrueba + `auth/user/${email}`, dataToUpdate).subscribe({
          next: () => {
            console.log("usuario modificado!")
            const data = {
              "nombre": `${this.usuario.nombre} ${this.usuario.apellido}`,
              "app": "Codigo Trauma",
              "clave": nuevaPassword,
              "email": this.usuario.email
            }
            this.client.post(this.baseForgotPassword, data).subscribe({
              next: (data) => {
                this.mensajeria.presentarAlertaSucess('Se ha enviado un correo con tu nueva credencial!')
                this.router.navigate(['login'])
              },
              error: (err) => {
                console.log(err)
              }
            })
          }
        })
      },
      error: (err) => {
        this.mensajeria.presentarAlerta("No se ha ecotrado el correo!")
      }
    })

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
