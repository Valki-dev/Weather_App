import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: WeatherService) { }

  @ViewChild("header") header?: ElementRef<HTMLDivElement>
  
  ngOnInit(): void {
  }

  sendWeatherDescription(weatherDescription: string) {
    // console.log('desc',weatherDescription);
    if (weatherDescription === 'Clouds') {
      this.header?.nativeElement.classList.add("nublado");
    }
  }

}
