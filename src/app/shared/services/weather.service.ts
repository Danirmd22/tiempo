import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherDataSubject = new BehaviorSubject<any>(null);
  private forecastDataSubject = new BehaviorSubject<any>(null);

  weatherData$ = this.weatherDataSubject.asObservable();
  forecastData$ = this.forecastDataSubject.asObservable();

  private API_KEY = '9e12ce681891bbfbbfce1e15fbad0f67';

  constructor(private http: HttpClient) { }

  getCityWeather(city: string): void {
    this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&lang=es`).subscribe(data => {
      this.weatherDataSubject.next(data);
      console.log("Prueba1");
      console.log(data);
    });
  }

  getCityForecast(city: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.API_KEY}&lang=es`);
  }


  // ...

  updateForecastData(forecastData: any): void {
    this.forecastDataSubject.next(forecastData);
  }
}
