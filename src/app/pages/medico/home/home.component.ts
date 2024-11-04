import { Component, OnInit } from '@angular/core';
import { AtencionService } from '../../../services/atencion/atencion.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-medico-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeMedicComponent implements OnInit {

  emergencia: any[] = []

  constructor(private _atencion: AtencionService , private _fb:FormBuilder) {
    
  }

  ngOnInit(): void {
    this.traerEmergencia()
  }



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
