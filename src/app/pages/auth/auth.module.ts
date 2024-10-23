import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent,RegistroComponent,ForgotPasswordComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent,RegistroComponent,ForgotPasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
