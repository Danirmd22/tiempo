import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrl: './card-weather.component.css'
})
export class CardWeatherComponent {
  @Input() weatherData: any;
}
