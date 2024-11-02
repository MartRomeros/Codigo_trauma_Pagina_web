import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { RecepcionHomeComponent } from './pages/recepcion/recepcion-home/recepcion-home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'recepcion',
        component: RecepcionHomeComponent
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },

];
