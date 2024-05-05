import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrl: './card-weather.component.css'
})
export class CardWeatherComponent {
  @Input() weatherData: any;
  @Input() showData: boolean = true;
  url = 'https://openweathermap.org/img/wn/';
  iconUrl = '';
  // ... declara las demás variables aquí ...

  days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  constructor(private cdr: ChangeDetectorRef,private http: HttpClient,private weatherService: WeatherService) {}


  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe(data => {
      this.weatherData = data;
      if (this.weatherData && this.weatherData.weather && this.weatherData.weather[0]) {
        this.iconUrl = this.url + this.weatherData.weather[0].icon + '@4x.png';
      }
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && changes['weatherData'].currentValue) {
      this.weatherData = changes['weatherData'].currentValue;
      console.log(this.weatherData); // Imprime los datos del clima en la consola
      if (this.weatherData && this.weatherData.weather && this.weatherData.weather[0]) {
        this.iconUrl = this.url + this.weatherData.weather[0].icon + '@4x.png';
      }
    }
  }
}
