import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmergenciaComponent } from '../emergencia/emergencia.component';



@NgModule({
  declarations: [PanelControlComponent,EmergenciaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PanelControlModule { }
