import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AppStartComponent } from './app-start/app-start.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'start', component: AppStartComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/start/home', pathMatch: 'full' }
  ] },
  { path: '', redirectTo: '/start/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
