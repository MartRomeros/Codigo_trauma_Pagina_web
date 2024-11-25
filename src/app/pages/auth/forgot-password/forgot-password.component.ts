import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { AuthService } from '../../../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  public forgotForm!: FormGroup

  private _auth = inject(AuthService)
  private _mensajeria = inject(MensajeriaService)
  private _router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.forgotForm = fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  async recuperarCredencial() {
    try {
      const correo = this.forgotForm.get('email')?.value

      const user: any = await lastValueFrom(this._auth.traerPersonalByEmail(correo))
      console.log(user)

      const password = this._auth.generarContrasenaUnica()
      const data = { password: password }

      const response1 = await lastValueFrom(this._auth.actualizarPassword(correo, data))
      this._mensajeria.presentarAlertaSucess(response1.message)

      const dataToNotificar = {
        nombre: `${user.nombre} ${user.apellido}`,
        app: 'Codigo Trauma',
        clave: password,
        email: correo
      }
      await lastValueFrom(this._auth.notificarUsuario(dataToNotificar))
      this._router.navigate(['login'])


      //await lastValueFrom(this._auth.notificarUsuario(correo))


    } catch (error: any) {
      console.log(error)
    }
  }

  validarCampo(nombre: string): string {
    return this._auth.validarCampo(this.forgotForm, nombre)
  }

}
