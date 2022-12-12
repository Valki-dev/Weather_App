import { Component } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { Tiempo } from '../interfaces/weather.interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private service: WeatherService) { }

  search: string = ""; 

  searchCity(search: string) {
    this.service.searchCity(search).subscribe((response: any) => {
      this.service.cityFound = response;
    });
    this.search = "";
  }

}
