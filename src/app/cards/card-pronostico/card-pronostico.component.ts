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
  weeklyForecast: any[] = [];
  public forecastLimit = 4;

constructor(private weatherService: WeatherService) { }

ngOnInit(): void {
  this.weatherService.weatherData$.subscribe(data => {
    this.weatherData = data;
  });
  this.weatherService.forecastData$.subscribe(data => {
    this.forecastData = data;
    if (this.forecastData) {
      const now = new Date();
      this.nextForecasts = this.forecastData.list.filter((forecast: any) => new Date(forecast.dt_txt) > now).slice(0, 4);
    }
  });
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['forecastData'] && changes['forecastData'].currentValue) {
    this.forecastData = changes['forecastData'].currentValue;
    if (this.forecastData) {
      const now = new Date();
      this.nextForecasts = this.forecastData.list.filter((forecast: any) => new Date(forecast.dt_txt) > now).slice(0, 4);
    }
  }
}
public toggleForecastLimit(): void {
  this.forecastLimit = this.forecastLimit === 4 ? this.weeklyForecast.length : 4;
}

updateWeeklyForecast(): void {
  if (this.forecastData && this.forecastData.list) {
    this.weeklyForecast = this.forecastData.list.map((forecast: any) => {
      // Convertir la cadena de fecha y hora a un objeto Date
      forecast.dt_txt = new Date(forecast.dt_txt);
      return forecast;
    }).slice(0, 8); // Limitar la salida a 8 elementos
    // Actualizar nextForecasts con todos los pronósticos
    this.nextForecasts = this.weeklyForecast;
  }
}

}
