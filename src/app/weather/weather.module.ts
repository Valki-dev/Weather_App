import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MainPageComponent } from './main-page/main-page.component';



@NgModule({
  declarations: [
    SearchComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchComponent
  ]
})
export class WeatherModule { }
