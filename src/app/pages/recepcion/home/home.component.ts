import { Component, OnInit } from '@angular/core';

interface Emergencia {
  id: number;
  fecha: string;
  descripcion: string;
  victimas: number;
}

@Component({
  selector: 'app-recepcion-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  emergencias: Emergencia[] = [];
  descripcion: string = '';
  victimas: string = '';

  ngOnInit() {
    this.cargarEmergencias();
    this.eliminarEmergenciasExpiradas();
  }

  AgregarEmergencia() {
    if (!this.descripcion || this.descripcion.length < 5) {
      alert('La descripción es obligatoria y debe tener al menos 5 caracteres.');
      return;
    }

    const numeroVictimas = parseInt(this.victimas);
    if (!this.victimas || isNaN(numeroVictimas) || numeroVictimas < 1) {
      alert('El número de víctimas es obligatorio y debe ser al menos 1.');
      return;
    }

    const nuevaEmergencia: Emergencia = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      descripcion: this.descripcion,
      victimas: numeroVictimas
    };
    this.emergencias.unshift(nuevaEmergencia);
    this.guardarEmergencias();
    this.descripcion = '';
    this.victimas = '';
  }

  get totalVictimas(): number {
    return this.emergencias.reduce((total, emergencia) => total + emergencia.victimas, 0);
  }

  private guardarEmergencias() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();
    localStorage.setItem('emergencias', JSON.stringify(this.emergencias));
    localStorage.setItem('expiracion', endOfDay.toString());
  }

  private cargarEmergencias() {
    const expiracion = localStorage.getItem('expiracion');
    const now = Date.now();
    if (expiracion && now > parseInt(expiracion)) {
      localStorage.removeItem('emergencias');
      localStorage.removeItem('expiracion');
      this.emergencias = [];
    } else {
      const data = localStorage.getItem('emergencias');
      if (data) {
        this.emergencias = JSON.parse(data);
      }
    }
  }

  private eliminarEmergenciasExpiradas() {
    const now = Date.now();
    const expiracion = localStorage.getItem('expiracion');
    if (expiracion && now > parseInt(expiracion)) {
      this.emergencias = [];
      localStorage.removeItem('emergencias');
      localStorage.removeItem('expiracion');
    }
  }
}