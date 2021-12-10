import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {BancaComponent } from './banca/banca.component';

import { AuthGuard } from './guards/auth.guard';
import { ListPrestamosComponent } from './list-prestamos/list-prestamos.component';
import { PrestamoComponent } from './prestamos/prestamo/prestamo.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'banca', component: BancaComponent },
  { path: 'ListPrestamos', component:ListPrestamosComponent },
  { path: 'prestamo/:id', component:PrestamoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
