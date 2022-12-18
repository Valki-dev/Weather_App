import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './weather/main-page/main-page.component';
import { PronosticoSemanalComponent } from './weather/pronostico-semanal/pronostico-semanal.component';
import { ContaminacionComponent } from './weather/contaminacion/contaminacion.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'pronostico-semanal', component: PronosticoSemanalComponent},
  {path: 'contaminacion', component: ContaminacionComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }