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
<<<<<<< HEAD
  constructor(private router: Router){

  }
  HistorialEmergencia(){
    this.router.navigate(['emergencia'])
=======

  constructor(private router:Router){}

  panelControl(){
    this.router.navigate(['panel-control'])
>>>>>>> c22d13a3b6398993e45fa8c5ec3f2f65f0b1e5d5
  }
}
