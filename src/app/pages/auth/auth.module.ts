import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [LoginComponent,RegistroComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports: [LoginComponent,RegistroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
