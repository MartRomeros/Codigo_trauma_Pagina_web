import { Component, OnInit } from '@angular/core';
import { AtencionService } from '../../../services/atencion/atencion.service';

@Component({
  selector: 'app-medico-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeMedicComponent implements OnInit {

  emergencia: any[] = []

  ngOnInit(): void {
    this.traerEmergencia()
  }

  constructor(private _atencion: AtencionService) { }



  traerEmergencia() {
    const correo = JSON.parse(localStorage.getItem('correo') || '')
    this._atencion.traerAtencionByMedico(correo).subscribe({
      next: (data) => {
        console.log(data)
        this.emergencia = data
      }
    })
  }

}
