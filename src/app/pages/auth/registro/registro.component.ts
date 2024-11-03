import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  cargando: boolean = false
  formularioRegistro?: FormGroup | any


  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private mensajeria: MensajeriaService) {

    this.formularioRegistro = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
    })

  }


  registrar() {
    this.cargando = true

    if (!this.validarCampos()) {
      return
    }

    const data = {
      email: this.formularioRegistro.get('correo').value,
      password: this.formularioRegistro.get('password').value,
      apellido: this.formularioRegistro.get('apellido').value,
      cargo: this.formularioRegistro.get('cargo').value,
      nombre: this.formularioRegistro.get('nombre').value
    }

    this._authService.registrar(data).subscribe({
      next: (data: any) => {

        console.log(data)
        this.cargando = false
        this.mensajeria.presentarAlertaSucess('usuario creado redirigiendo al inicio de sesión')
        this.router.navigate(['login'])


      },
      error: (err: any) => {
        this.mensajeria.presentarAlerta(err.error.message)
        this.cargando = false
      }

    })

    this.cargando = false

  }

  validarCampo(nombre: string): boolean {
    return this.formularioRegistro.get(nombre).errors && this.formularioRegistro.get(nombre).touched
  }

  validarCampos(): boolean {

    const campos = Object.keys(this.formularioRegistro.controls)

    for (let index = 0; index < campos.length; index++) {
      const campo = this.formularioRegistro.get(campos[index])
      if (campo.errors) {
        this.cargando = false
        this.mensajeria.presentarAlerta('Verifica los campos!')
        return false
      }
    }
    return true
  }

}
