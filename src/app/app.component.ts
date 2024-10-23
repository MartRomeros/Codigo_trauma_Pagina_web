import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './pages/auth/auth.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AuthModule],
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
