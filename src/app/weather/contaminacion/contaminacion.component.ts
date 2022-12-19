import { Component, ElementRef } from '@angular/core';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-contaminacion',
  templateUrl: './contaminacion.component.html',
  styleUrls: ['./contaminacion.component.css']
})
export class ContaminacionComponent{

  airQuality: string = "";

  constructor(private service: WeatherService) { }

  get getAirPollution() {
    if(this.service.airPollution) {
      switch(this.service.airPollution.list[0].main.aqi) {
        case 1:
          this.airQuality = "Muy bueno"; 
          break;
        case 2:
          this.airQuality = "Bueno";
          break;
        case 3:
          this.airQuality = "Medio";
          break;
        case 4:
          this.airQuality = "Bajo";
          break;
        case 5:
          this.airQuality = "Muy bajo";
          break;
      }
      return this.service.airPollution;
    }
    
    return this.service.airPollution;
  }

  get getIsLoading() {
    return this.service.isLoading;
  }

  changeStyles(airQuality: string) {
    switch (airQuality) {
      case "Bueno":
        airQuality
    }
  }

}
