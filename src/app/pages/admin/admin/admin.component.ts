import { Component, OnInit } from '@angular/core';
import { AtencionService } from '../../../services/atencion/atencion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  atencionForm!: FormGroup
  atenciones: any = []
  medicos: any = []

  constructor(private _atencion: AtencionService, private fb: FormBuilder, private _mensajeria: MensajeriaService, private _router: Router) {
    this.atencionForm = fb.group({
      atencionId: ['', [Validators.required]],
      victimas: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
    this.traerAtenciones()
    this.traerMedicos()
  }

  traerAtenciones() {
    this._atencion.traerAtenciones().subscribe({
      next: (data) => {
        this.atenciones = data.atenciones
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  traerAtencion() {

    if (this.atencionForm.get('atencionId')!.errors) {
      this._mensajeria.presentarAlerta('verifica el id')
      return

    }

    const id = parseInt(this.atencionForm.get('atencionId')?.value)
    this._atencion.traerAtencion(id).subscribe({
      next: (data) => {
        this.atencionForm.get('victimas')?.setValue(data.atencion.victimas)
        this.atencionForm.get('descripcion')?.setValue(data.atencion.descripcion)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  async traerMedicos() {
    const response: any = await lastValueFrom(this._atencion.traerMedicos())
    console.log(response.medicos)
    this.medicos = response.medicos
  }

  asignarMedico() {

    if (!this.validarCampos()) {
      return
    }

    const id = this.atencionForm.get('atencionId')?.value
    const correo = this.atencionForm.get('email')?.value


    this._atencion.asignarAtencion(id, "en progreso", correo)
    this.traerAtenciones()
    this.traerMedicos()

  }

  validarCampos(): boolean {

    const campos = Object.keys(this.atencionForm.controls)

    for (let index = 0; index < campos.length; index++) {
      const campo = this.atencionForm.get(campos[index])
      if (campo!.errors) {
        this._mensajeria.presentarAlerta('Verifica los campos!')
        return false
      }
    }
    return true
  }

  refrescarPage() {
    this._router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/admin'])
    })
  }

}
