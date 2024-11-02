import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent {

  cargando?: boolean

  constructor(private router: Router, private _auth: AuthService) {

  }

  login() {
    setTimeout(() => {
      this.cargando = false
      this.router.navigate(['panel-control'])
    }, 3000);
    this.cargando = true
  }

}
