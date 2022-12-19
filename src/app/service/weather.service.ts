import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tiempo } from '../weather/interfaces/weather.interfaces';
import { AppComponent } from '../app.component';
import { FiveDaysForecast, List } from '../weather/interfaces/fiveDaysForecast.interfaces';
import { AirPollution } from '../weather/interfaces/airPollution.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { 
    if(localStorage.getItem("storedSearchs")) {
      this.searchs = JSON.parse(localStorage.getItem("storedSearchs")!);

      if(this.searchs) {
        this.searchCity(this.searchs[this.searchs.length - 1]).subscribe((response: any) => {
          this.cityFound = response;
          this.weatherMain = response.weather[0].main;
    
          this.getFiveDaysForecast().subscribe((response: any) => {
            this.forecast = response.list; 
          });

          this.getAirPollution().subscribe((response: any) => {
            this.airPollution = response;
          });
        });
      }
      
    }
  }

  private api_key: string = "b5dcfd0d8767d8ef09affc547adec383";

  private searchCityEndpoint: string = "https://api.openweathermap.org/data/2.5/weather?&appid=";
  private fiveDaysForecastEndpoint: string = "https://api.openweathermap.org/data/2.5/forecast";
  private airPollutionEndpoint: string = "https://api.openweathermap.org/data/2.5/air_pollution";

  public storedSearch: string = "";
  public searchs: string[] = [];
  public cityFound!: Tiempo;
  public weatherMain: string = "";
  public forecast!: List[]; 
  public airPollution!: AirPollution;

  searchCity(search: string): Observable<Tiempo> {
    console.log("YES");
    
    search = search.trim();
    search = search.toLowerCase();
    if(search != "") {
      if(!this.searchs.includes(search)) {
        return this.httpClient.get<Tiempo>(`${this.searchCityEndpoint}${this.api_key}&q=${search}&lang=sp`);
      }
    }
    return this.httpClient.get<Tiempo>(``);
  }

  getFiveDaysForecast() {    
    return this.httpClient.get<FiveDaysForecast>(`${this.fiveDaysForecastEndpoint}?lat=${this.cityFound.coord.lat}&lon=${this.cityFound.coord.lon}&appid=${this.api_key}`);
  }

  getAirPollution() {
    return this.httpClient.get<AirPollution>(`${this.airPollutionEndpoint}?lat=${this.cityFound.coord.lat}&lon=${this.cityFound.coord.lon}&appid=${this.api_key}`);
  }

}
