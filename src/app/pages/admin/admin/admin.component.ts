import { Component, OnInit } from '@angular/core';
import { AtencionService } from '../../../services/atencion/atencion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  atencionForm!: FormGroup
  atenciones: any = []
  medicos: any = []

  constructor(private _atencion: AtencionService, private fb: FormBuilder) {
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

  traerMedicos() {
    this._atencion.traerMedicos().subscribe({
      next: (data) => {
        this.medicos = data.medicos
      }
    })
  }

  asignarMedico() {

    this._atencion.asignarAtencion(28, "atendida", "martinsantiago.se@gmail.com")

  }

}
