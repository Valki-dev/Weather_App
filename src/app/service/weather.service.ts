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
  public showAlert: boolean = false;
  public isLoading: boolean = false;

  searchCity(search: string): Observable<Tiempo> {
    this.isLoading = true;
    
    search = search.trim();
    search = search.toLowerCase();
    if(search != "") {
      this.showAlert = false;
      if(!this.searchs.includes(search)) {
        if(this.searchs.length >= 5) {
          this.httpClient.get<Tiempo>(`${this.searchCityEndpoint}${this.api_key}&q=${search}&lang=sp`).subscribe((response:any) => {
            if(response) {
              this.isLoading = false;
            }
            this.searchs.shift();
            this.searchs.push(search);
            localStorage.setItem("storedSearchs", JSON.stringify(this.searchs));
            
          }, (error: any) => {
            this.showAlert = true;
            this.isLoading = false;
            return
          })
          
        } else {
          this.httpClient.get<Tiempo>(`${this.searchCityEndpoint}${this.api_key}&q=${search}&lang=sp`).subscribe((response:any) => {
            if(response) {
              this.isLoading = false;
            }
            this.searchs.push(search);
            localStorage.setItem("storedSearchs", JSON.stringify(this.searchs));
            
          }, (error: any) => {
            this.showAlert = true;
            this.isLoading = false;
            return
          })
        }
      }
      this.isLoading = false;
    }      
      return this.httpClient.get<Tiempo>(`${this.searchCityEndpoint}${this.api_key}&q=${search}&lang=sp`);
      
    }
    // return this.httpClient.get<Tiempo>(``);
  

  getFiveDaysForecast() {    
    return this.httpClient.get<FiveDaysForecast>(`${this.fiveDaysForecastEndpoint}?lat=${this.cityFound.coord.lat}&lon=${this.cityFound.coord.lon}&appid=${this.api_key}`);
  }

  getAirPollution() {
    return this.httpClient.get<AirPollution>(`${this.airPollutionEndpoint}?lat=${this.cityFound.coord.lat}&lon=${this.cityFound.coord.lon}&appid=${this.api_key}`);
  }

}
