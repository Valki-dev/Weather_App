import { Component, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service: WeatherService) { }
  title = 'Practica-ampliacion-tiempo';
  
  changeTheme() {
    if(this.service.weatherMain == "Clouds") {
      let header = document.getElementById("header");
      header?.classList.add("nublado");
    }
  }

}
