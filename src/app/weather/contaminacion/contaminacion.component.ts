import { Component } from '@angular/core';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-contaminacion',
  templateUrl: './contaminacion.component.html',
  styleUrls: ['./contaminacion.component.css']
})
export class ContaminacionComponent{

  constructor(private service: WeatherService) { }

  get getAirPollution() {
    return this.service.airPollution;
  }

}
