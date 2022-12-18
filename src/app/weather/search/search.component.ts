import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { Tiempo, Weather } from '../interfaces/weather.interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private service: WeatherService) { }

  search: string = ""; 

  @Output() setWeatherDescription = new EventEmitter<string>();

  searchCity(search: string) {
    this.service.searchCity(search).subscribe((response: any) => {
      this.service.cityFound = response;
      this.service.weatherMain = response.weather[0].main;
      console.log(this.service.weatherMain);
      this.setWeatherDescription.emit(this.service.weatherMain);
    });
    this.search = "";

    
  }

}
