import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent],//home de recepcion
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
  ],
  exports: [HomeComponent],
  providers: [HttpClientModule]
})
export class RecepcionModule { }