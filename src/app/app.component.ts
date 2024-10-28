import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './pages/auth/auth.module';
import { Router } from '@angular/router';
import { PanelControlModule } from './pages/panel-control/panel-control.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AuthModule,PanelControlModule,MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'codigo-trauma-web';
  constructor(private router: Router){

  }
  HistorialEmergencia(){
    this.router.navigate(['emergencia'])

  }
  panelControl(){
    this.router.navigate(['panel-control'])
  }
}
