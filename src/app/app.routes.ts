import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { HomeComponent } from './pages/home/home/home.component';
import { EmergenciaComponent } from './pages/emergencia/emergencia.component';
import { PanelControlComponent } from './pages/panel-control/panel-control.component';

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
        path:'emergencia',
        component: EmergenciaComponent
    },
    {
        path: 'panel-control',
        component: PanelControlComponent
    },
    {
        path:'**',
        redirectTo: 'login',
        pathMatch:'full'
    },
    
];
