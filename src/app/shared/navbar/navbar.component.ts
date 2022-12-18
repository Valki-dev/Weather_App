import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor() { }

  @ViewChild("menu") menu?: ElementRef<HTMLDivElement>

  currentDay: string = new Date().toLocaleDateString();

  sendWeatherDescription(weatherDescription: string) {
    console.log('ENTRA',weatherDescription);
    if (weatherDescription === 'Clouds') {
      this.menu?.nativeElement.classList.add("nublado");
    }
  }
  
}
