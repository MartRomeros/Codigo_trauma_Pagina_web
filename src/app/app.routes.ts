import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { HomeComponent } from './pages/home/home/home.component';
import { EmergenciaComponent } from './pages/emergencia/emergencia.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { PanelControlComponent } from './pages/panel-control/panel-control/panel-control.component';
import { EmergenciasUpdateComponent } from './pages/panel-control/emergencias-update/emergencias-update.component';

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
        path:'forgot-password',
        component: ForgotPasswordComponent
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
        path: 'emergency-update',
        component: EmergenciasUpdateComponent
    },
    {
        path:'**',
        redirectTo: 'login',
        pathMatch:'full'
    },
    
];
