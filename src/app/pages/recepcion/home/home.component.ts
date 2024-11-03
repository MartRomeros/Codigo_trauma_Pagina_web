import { Component, OnInit } from '@angular/core';
import { EmergenciasService } from '../../../services/emergencia/emergencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-recepcion-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recepcionForm!: FormGroup
  emergencias: any = [];
  descripcion?: string;
  victimas?: number
  fechaActual: Date = new Date()
  fecha: string = this.fechaActual.getDate() + '/' + (this.fechaActual.getMonth() + 1) + '/' + this.fechaActual.getFullYear()

  constructor(private _emergencia: EmergenciasService, private fb: FormBuilder, private mensajeria: MensajeriaService, private _auth: AuthService) {
    this.recepcionForm = fb.group({
      cantidadVictimas: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.cargarEmergencias();
  }

  AgregarEmergencia() {

    this.descripcion = this.recepcionForm.get('descripcion')?.value
    this.victimas = this.recepcionForm.get('cantidadVictimas')?.value

    if (!this.descripcion || this.descripcion.length < 5) {
      this.mensajeria.presentarAlerta('La descripción es obligatoria y debe tener al menos 5 caracteres.')
      return;
    }

    if (!this.victimas || this.victimas <= 0) {
      this.mensajeria.presentarAlerta('La cantidad de victimas es obligatoria')
      return;
    }


    const data = {
      descripcion: this.descripcion,
      victimas: this.victimas,
      fecha: this.fecha
    }

    this._emergencia.crearEmergencia(data).subscribe({
      next: (data) => {
        this.mensajeria.presentarAlertaSucess(data.message)
        this._emergencia.traerEmergencias().subscribe({
          next: (data) => {
            this.emergencias = data
            console.log(this.emergencias)
          }
        })
      }
    })


  }

  private cargarEmergencias() {

    this._emergencia.traerEmergencias().subscribe({
      next: (data) => {
        this.emergencias = data
      },
      error: (err) => {
        this.mensajeria.presentarAlerta('error en la autenticacion, deberas iniciar sesion otra vez!')
        this._auth.logout()

      }
    })

  }

}