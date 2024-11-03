import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/recepcion/home/home.component';
import { HomeMedicComponent } from './pages/medico/home/home.component';
import { AdminComponent } from './pages/admin/admin/admin.component';

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
        component: HomeComponent //home de recepcion!!
    },
    {
        path: 'medico',
        component: HomeMedicComponent //home de medico!!
    },
    {
        path: 'admin',
        component: AdminComponent //home de medico!!
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },

];
