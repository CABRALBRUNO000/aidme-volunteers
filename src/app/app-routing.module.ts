import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MypageComponent } from './mypage/mypage.component';
import { Erro404Component } from './erro404/erro404.component';
import { FormCadComponent } from './app-forms/form-cad/form-cad.component';
import { FiltrosComponent } from './app-forms/filtros/filtros.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: 'ListVolunteers', pathMatch: 'full' },
    { path: 'ListVolunteers', component: MainComponent },
    { path: 'voluntary/:id', component: MypageComponent },
    { path: 'formulario', component: FormCadComponent },
    { path: 'formulario/:id', component: FormCadComponent },
    { path: 'filtros', component: FiltrosComponent },
    { path: '**', component: Erro404Component },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
