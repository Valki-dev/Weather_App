import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tiempo } from '../weather/interfaces/weather.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { 
    if(localStorage.getItem("storedSearch")) {
      this.storedSearch = JSON.parse(localStorage.getItem("storedSearch")!);
    }
  }

  private searchCityEndpoint: string = "https://api.openweathermap.org/data/2.5/weather?&appid=b5dcfd0d8767d8ef09affc547adec383";

  public storedSearch: string = "";
  public cityFound!: Tiempo;

  searchCity(search: string): Observable<Tiempo> {
    search = search.trim();
    search = search.toLowerCase();
    if(search != "") {
      localStorage.setItem("storedSearch", JSON.stringify(search));
      return this.httpClient.get<Tiempo>(`${this.searchCityEndpoint}&q=${search}&lang=sp`);
    }
    return this.httpClient.get<Tiempo>(``);
  }

}
