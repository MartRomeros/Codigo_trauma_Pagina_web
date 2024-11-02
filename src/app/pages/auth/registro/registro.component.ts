import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formularioRegistro?: any


  constructor(private fb: FormBuilder, private _authService: AuthService) {

    this.formularioRegistro = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
    })

  }

  cargando: boolean = false

  registrar() {

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

      },
      error: (err: any) => {
        console.log(err)
      }

    })
  }


}
