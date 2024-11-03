import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeriaService } from '../../../services/mensajeria/mensajeria.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forgotForm!: FormGroup

  constructor(private fb: FormBuilder, private mensajeria: MensajeriaService) {
    this.forgotForm = fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  recuperarCredencial() {

    if (this.forgotForm.get('correo')?.errors) {
      this.mensajeria.presentarAlerta('Verifica tu correo!')
      return
    }

  }

  validarCampo(nombre: string): boolean | null {
    return this.forgotForm.get(nombre)!.errors && this.forgotForm.get(nombre)!.touched
  }

}
