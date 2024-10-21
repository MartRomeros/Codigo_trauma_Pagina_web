import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { HomeComponent } from './pages/home/home/home.component';
<<<<<<< HEAD
import { EmergenciaComponent } from './pages/emergencia/emergencia.component';
=======
import { PanelControlComponent } from './pages/panel-control/panel-control.component';
>>>>>>> c22d13a3b6398993e45fa8c5ec3f2f65f0b1e5d5

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'registro',
        component: RegistroComponent
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
<<<<<<< HEAD
        path:'emergencia',
        component: EmergenciaComponent
=======
        path: 'panel-control',
        component: PanelControlComponent
>>>>>>> c22d13a3b6398993e45fa8c5ec3f2f65f0b1e5d5
    },
    {
        path:'**',
        redirectTo: 'login',
        pathMatch:'full'
    },
    
];
