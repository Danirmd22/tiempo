import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faDroplet, faThermometer0, faWind, faWater, faSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../shared/services/weather.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card-pronosticosemanal',
  templateUrl: './card-pronosticosemanal.component.html',
  styleUrls: ['./card-pronosticosemanal.component.css']
})
export class CardPronosticosemanalComponent implements OnInit, OnChanges {
  @Input() weatherData: any;
  @Input() forecastData: any;
  weeklyForecast: any[] = [];
  faDroplet = faDroplet;
  faThermometer0 = faThermometer0;
  faWind = faWind;
  faWater = faWater;
  faSun = faSun;
  faCloud = faCloud;
  public showMoreInfo = false;
  public openDetails: boolean[] = []; // Estado del panel para cada día

  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.weatherService.forecastData$.subscribe(data => {
      this.forecastData = data;
      this.updateWeeklyForecast();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecastData'] && changes['forecastData'].currentValue) {
      this.updateWeeklyForecast();
    }
  }

  updateWeeklyForecast(): void {
    if (this.forecastData && this.forecastData.list) {
      let currentDay = new Date().getDay();
      this.weeklyForecast = this.forecastData.list.filter((forecast: any) => {
        const forecastDay = new Date(forecast.dt_txt).getDay();
        if (forecastDay !== currentDay) {
          currentDay = forecastDay;
          return true;
        }
        return false;
      }).slice(0, 4).map((forecast: any) => {
        forecast.dt_txt = new Date(forecast.dt_txt);
        return forecast;
      });
      this.openDetails = Array(this.weeklyForecast.length).fill(false); // Inicializa los estados de panel
    }
  }

  togglePanel(index: number) {
    this.openDetails[index] = !this.openDetails[index];
  }
}
