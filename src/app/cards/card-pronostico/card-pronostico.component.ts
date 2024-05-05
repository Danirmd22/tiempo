import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { SimpleChanges } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
@Component({
  selector: 'app-card-pronostico',
  templateUrl: './card-pronostico.component.html',
  styleUrl: './card-pronostico.component.css'
})
export class CardPronosticoComponent {
  @Input() weatherData: any;
  @Input() forecastData: any;
  nextForecasts: any[] = [];
  faDroplet = faDroplet;
constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.forecastData$.subscribe(data => {
      this.forecastData = data;
      const now = new Date();
      this.nextForecasts = this.forecastData.list.filter((forecast: any) => new Date(forecast.dt_txt) > now).slice(0, 4);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecastData'] && changes['forecastData'].currentValue) {
      this.forecastData = changes['forecastData'].currentValue;
      const now = new Date();
      this.nextForecasts = this.forecastData.list.filter((forecast: any) => new Date(forecast.dt_txt) > now).slice(0, 4);
    }}}



