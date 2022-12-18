import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tiempo } from '../weather/interfaces/weather.interfaces';
import { AppComponent } from '../app.component';
import { FiveDaysForecast } from '../weather/interfaces/fiveDaysForecast.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { 
    if(localStorage.getItem("storedSearch")) {
      this.storedSearch = JSON.parse(localStorage.getItem("storedSearch")!);
    }
  }

  private api_key: string = "b5dcfd0d8767d8ef09affc547adec383";

  private searchCityEndpoint: string = "https://api.openweathermap.org/data/2.5/weather?&appid=";
  private fiveDaysForecastEndpoint: string = "https://api.openweathermap.org/data/2.5/forecast";

  public storedSearch: string = "";
  public cityFound!: Tiempo;
  public weatherMain: string = "";

  searchCity(search: string): Observable<Tiempo> {
    search = search.trim();
    search = search.toLowerCase();
    if(search != "") {
      localStorage.setItem("storedSearch", JSON.stringify(search));
      return this.httpClient.get<Tiempo>(`${this.searchCityEndpoint}${this.api_key}&q=${search}&lang=sp`);
    }
    return this.httpClient.get<Tiempo>(``);
  }

  getFiveDaysForecast() {
    if(this.cityFound) {
      return this.httpClient.get<FiveDaysForecast>(`${this.fiveDaysForecastEndpoint}?lat=${this.cityFound.coord.lat}&lon=${this.cityFound.coord.lon}&appid=${this.api_key}`);
    }
    return this.httpClient.get<FiveDaysForecast>(``);
  }

}
