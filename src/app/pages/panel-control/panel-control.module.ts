import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmergenciasUpdateComponent } from './emergencias-update/emergencias-update.component';
import { HistorialEmergenciaComponent } from './historial-emergencia/historial-emergencia.component';



@NgModule({
  declarations: [PanelControlComponent,EmergenciasUpdateComponent,HistorialEmergenciaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[PanelControlComponent,EmergenciasUpdateComponent,HistorialEmergenciaComponent]
})
export class PanelControlModule { }
