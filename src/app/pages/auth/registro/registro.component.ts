import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  cargando?: boolean
  formularioRegistro!: FormGroup
  cargos?: any[]


  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private mensajeria: MensajeriaService,
    private _http: HttpClient
  ) {

    this.formularioRegistro = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      fono: ['', [Validators.required]],
    })

  }

  async ngOnInit() {
    const data: any = await lastValueFrom(this._http.get('http://localhost:3000/cargo/all_cargos'))
    this.cargos = data.cargos
  }

  register() {
    setTimeout(() => {
      this.cargando = false

      const data = {
        nombre: this.formularioRegistro.get('nombre')?.value,
        apellido: this.formularioRegistro.get('apellido')?.value,
        fono: parseInt(this.formularioRegistro.get('fono')?.value),
        email: this.formularioRegistro.get('correo')?.value,
        password: this.formularioRegistro.get('password')?.value,
        cargo: parseInt(this.formularioRegistro.get('cargo')?.value)
      }

      this._authService.registrar(data)

    }, 2000);
    this.cargando = true
  }

  validarCampo(nombre: string): string {
    return this._authService.validarCampo(this.formularioRegistro, nombre)
  }

}
