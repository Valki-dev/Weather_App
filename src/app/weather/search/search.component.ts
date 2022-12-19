import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { Tiempo, Weather } from '../interfaces/weather.interfaces';
import { Coord } from '../interfaces/fiveDaysForecast.interfaces';

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
      if(response) {
        if(this.service.searchs.length >= 5) {
          this.service.searchs.shift();
          this.service.searchs.push(search);
          localStorage.setItem("storedSearchs", JSON.stringify(this.service.searchs));
        } else {
          this.service.searchs.push(search);
          localStorage.setItem("storedSearchs", JSON.stringify(this.service.searchs));
        }
        

        this.service.cityFound = response;
        this.service.weatherMain = response.weather[0].main;
        console.log(this.service.weatherMain);
        this.setWeatherDescription.emit(this.service.weatherMain);

        this.service.getFiveDaysForecast().subscribe((response: any) => {
          this.service.forecast = response.list; 
        });    

        this.service.getAirPollution().subscribe((response: any) => {
          this.service.airPollution = response;
          console.log(response);
        });
      }
      
    });
    
    
    this.search = "";
  }

}
