import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  {
  city: string = '';weatherData: any;
  forecastData: any;

  constructor(private weatherService: WeatherService) { }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.city.trim()) return;

    this.weatherService.getCityWeather(this.city);
    this.searchForecast(this.city);
  }

  searchForecast(city: string): void {
    this.weatherService.getCityForecast(city).subscribe(forecastData => {
      this.weatherService.updateForecastData(forecastData);
    });
  }}
