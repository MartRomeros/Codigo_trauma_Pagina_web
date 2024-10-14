import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  cargando?:boolean

  constructor(private router:Router){

  }

  login(){
    setTimeout(() => {
      this.cargando = false
      this.router.navigate(['home'])
    }, 3000);
    this.cargando = true
  }

}
