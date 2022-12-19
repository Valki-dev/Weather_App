import { Component, OnInit } from '@angular/core';
import { FiveDaysForecast, List } from '../interfaces/fiveDaysForecast.interfaces';
import { WeatherService } from '../../service/weather.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-pronostico-semanal',
  templateUrl: './pronostico-semanal.component.html',
  styleUrls: ['./pronostico-semanal.component.css']
})
export class PronosticoSemanalComponent {

  constructor(private service: WeatherService) { }

  allDaysForecast: List[] = [];

  currentDayForecast: List[] = [];
  firstDayForecast: List[] = [];
  secondDayForecast: List[] = [];
  thirdDayForecast: List[] = [];
  fourthDayForecast: List[] = [];
  fifthDayForecast: List[] = [];

  maxFirstTemp!: number;
  minFirstTemp!: number;


  maxSecondTemp!: number;
  minSecondTemp!: number;

  maxThirdTemp!: number;
  minThirdTemp!: number;

  maxFourthTemp!: number;
  minFourthTemp!: number;

  maxFifthTemp!: number;
  minFifthTemp!: number;
  

  currentDay: number = new Date().getDate();

  get getForecast() {
    if (this.service.forecast) {
      this.getData();
      return true;
    }
    return false;
  }

  get getIsLoading() {
    return this.service.isLoading;
  }

  private getData() {
    this.firstDayForecast = [];
    this.secondDayForecast = [];
    this.thirdDayForecast = [];
    this.fourthDayForecast = [];
    this.fifthDayForecast = [];

    this.service.forecast.filter(forecast => {
      

      if(new Date(forecast.dt_txt).getDate() == this.currentDay) {
        this.currentDayForecast.push(forecast);
      } 

      if(new Date(forecast.dt_txt).getDate() == (this.currentDay + 1)) {
        this.firstDayForecast.push(forecast);
      } 

      if(new Date(forecast.dt_txt).getDate() == (this.currentDay + 2)) {
        this.secondDayForecast.push(forecast);
      }

      if(new Date(forecast.dt_txt).getDate() == (this.currentDay + 3)) {
        this.thirdDayForecast.push(forecast);
      }

      if(new Date(forecast.dt_txt).getDate() == (this.currentDay + 4)) {
        this.fourthDayForecast.push(forecast);
      }

      if(new Date(forecast.dt_txt).getDate() == (this.currentDay + 5)) {
        this.fifthDayForecast.push(forecast);
      }
    });

    const firstTemps = this.firstDayForecast.map( day =>  day.main.temp)
    this.maxFirstTemp = Math.max(...firstTemps);
    this.minFirstTemp = Math.min(...firstTemps);
    const secondTemps = this.secondDayForecast.map( day =>  day.main.temp)
    this.maxSecondTemp = Math.max(...secondTemps);
    this.minSecondTemp = Math.min(...secondTemps);
    const thirdTemps = this.thirdDayForecast.map( day =>  day.main.temp)
    this.maxThirdTemp = Math.max(...thirdTemps);
    this.minThirdTemp = Math.min(...thirdTemps);
    const fourthTemps = this.fourthDayForecast.map( day =>  day.main.temp)
    this.maxFourthTemp = Math.max(...fourthTemps);
    this.minFourthTemp = Math.min(...fourthTemps);
    const fifthTemps = this.fifthDayForecast.map( day =>  day.main.temp);
    this.maxFifthTemp = Math.max(...fifthTemps);
    this.minFifthTemp = Math.min(...fifthTemps);

    console.log(this.firstDayForecast);
  }

}
