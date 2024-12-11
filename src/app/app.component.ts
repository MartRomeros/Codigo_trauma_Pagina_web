import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthModule } from './pages/auth/auth.module';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RecepcionModule } from './pages/recepcion/recepcion.module';
import { AuthService } from './services/auth/auth.service';
import { AdminModule } from './pages/admin/admin.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'
import { MedicoModule } from './pages/medico/medico.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthModule,
    HttpClientModule,
    RecepcionModule,
    AdminModule,
    MedicoModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClientModule]
})
export class AppComponent implements OnInit {

  private _router = inject(Router)

  public codigoTraumaIcon: string = '../../assets/icons/logo.svg'

  title = 'codigo-trauma-web';
  userToken: string = JSON.parse(localStorage.getItem('token') || 'null')
  usuario: string = JSON.parse(localStorage.getItem('token') || 'null')

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.verificarToken()
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

  navegar(ruta: string) {
    this._router.navigate([ruta])
  }

}
