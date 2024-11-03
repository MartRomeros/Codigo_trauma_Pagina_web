import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthModule } from './pages/auth/auth.module';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RecepcionModule } from './pages/recepcion/recepcion.module';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthModule, RouterLink, HttpClientModule, RecepcionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClientModule]
})
export class AppComponent implements OnInit {

  title = 'codigo-trauma-web';

  userToken: string = JSON.parse(localStorage.getItem('token') || 'null')
  usuario: string = JSON.parse(localStorage.getItem('token') || 'null')

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.userToken === 'null') {
      this.router.navigate(['login'])
    }

    if (this.usuario === 'null') {
      this.router.navigate(['login'])
    }

    this.auth.verificarTipoUsuario(this.usuario)

  }

  logout() {
    this.auth.logout()
  }

  verificarToken(): boolean {
    if (!localStorage.getItem('token')) {
      return false
    } else {
      return true
    }
  }

}
