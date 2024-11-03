import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeMedicComponent } from './home/home.component';



@NgModule({
  declarations: [HomeMedicComponent], //home de medico!!
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [HomeMedicComponent], //home de medico,
  providers: [HttpClientModule]
})
export class MedicoModule { }
