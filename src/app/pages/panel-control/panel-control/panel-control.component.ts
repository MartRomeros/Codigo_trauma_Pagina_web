import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent {
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
