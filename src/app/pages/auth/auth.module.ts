import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'
import { RegistroComponent } from './registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatStepperModule } from '@angular/material/stepper'
import { MatSelectModule } from '@angular/material/select'



@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, RegistroComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    SweetAlert2Module,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatStepperModule,
    MatSelectModule
  ],
  exports: [LoginComponent, ForgotPasswordComponent, RegistroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpClientModule]
})
export class AuthModule { }
