import { Component } from '@angular/core';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private service: WeatherService) { }

  get getCity() {
    return this.service.cityFound;
  }

  get getStoredSearch() {
    return this.service.storedSearch;
  }

}
