import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PronosticoSemanalComponent } from './pronostico-semanal/pronostico-semanal.component';
import { ContaminacionComponent } from './contaminacion/contaminacion.component';



@NgModule({
  declarations: [
    SearchComponent,
    MainPageComponent,
    PronosticoSemanalComponent,
    ContaminacionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    SearchComponent
  ]
})
export class WeatherModule { }
