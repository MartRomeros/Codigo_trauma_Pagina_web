import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthModule } from './pages/auth/auth.module';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthModule, RouterLink, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClientModule]
})
export class AppComponent {
  title = 'codigo-trauma-web';
  constructor(private router: Router) {

  }
  HistorialEmergencia() {
    this.router.navigate(['emergencia'])

  }
  panelControl() {
    this.router.navigate(['panel-control'])
  }
}
