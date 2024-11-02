import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';




@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, RegistroComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
  ],
  exports: [LoginComponent, ForgotPasswordComponent, RegistroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpClientModule]
})
export class AuthModule { }
