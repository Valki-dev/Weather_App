import { Component } from '@angular/core';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private service: WeatherService) { }

  searchs: string[] = this.service.searchs;

  get getCity() {
    return this.service.cityFound;
  }

  get getStoredSearch() {
    return this.service.storedSearch;
  }

  searchCity(search: string) {
    this.service.searchCity(search).subscribe((response: any) => {
      this.service.cityFound = response;
      this.service.weatherMain = response.weather[0].main;

      this.service.getFiveDaysForecast().subscribe((response: any) => {
        this.service.forecast = response.list; 
      });    
    });
  }

}
