import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    SweetAlert2Module
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
