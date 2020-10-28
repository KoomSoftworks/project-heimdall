import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AppStartComponent } from './app-start/app-start.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'start', component: AppStartComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/start/home', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/start/404', pathMatch: 'full' }
  ] },
  { path: 'main', component: MainNavBarComponent, children: [
    { path: 'home', component: MainComponent },
    { path: '', redirectTo: '/main/home', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/main/404', pathMatch: 'full' }
  ] },
  { path: '', redirectTo: '/start/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/start/404', pathMatch: 'full' }
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
