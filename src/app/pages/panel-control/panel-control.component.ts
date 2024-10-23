import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent implements OnInit {

  emergenciaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emergenciaForm = this.fb.group({
      descripcion: ['', Validators.required],
      victimas: ['', Validators.required],
      tipo: ['escoja', Validators.required],
      tipoArea: ['escoja', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.emergenciaForm.valid) {
      console.log(this.emergenciaForm.value);
      alert('Emergencia registrada exitosamente!');
      this.emergenciaForm.reset();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

}
