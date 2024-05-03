import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-card-pronosticosemanal',
  templateUrl: './card-pronosticosemanal.component.html',
  styleUrl: './card-pronosticosemanal.component.css'
})
export class CardPronosticosemanalComponent {
  @Input() weatherData: any;
  @Input() forecastData: any;
  weeklyForecast: any[] = [];
  faDroplet = faDroplet;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecastData'] && changes['forecastData'].currentValue) {
      this.forecastData = changes['forecastData'].currentValue;
      let currentDay = new Date().getDay();
      this.weeklyForecast = this.forecastData.list.filter((forecast: any) => {
        const forecastDay = new Date(forecast.dt_txt).getDay();
        if (forecastDay !== currentDay) {
          currentDay = forecastDay;
          return true;
        }
        return false;
      }).slice(0, 4).map((forecast: any) => {
        // Convertir la cadena de fecha y hora a un objeto Date
        forecast.dt_txt = new Date(forecast.dt_txt);
        return forecast;
      });
    }
  }}
