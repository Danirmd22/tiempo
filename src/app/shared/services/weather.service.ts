import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherDataSubject = new BehaviorSubject<any>(null);
  private forecastDataSubject = new BehaviorSubject<any>(null);
  private db = getFirestore();

  weatherData$ = this.weatherDataSubject.asObservable();
  forecastData$ = this.forecastDataSubject.asObservable();
  isLoading = true;
  private API_KEY = '9e12ce681891bbfbbfce1e15fbad0f67';

  constructor(private http: HttpClient) { }

  getCityWeather(city: string): void {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&lang=es`).subscribe(data => {
      this.weatherDataSubject.next(data);
      this.isLoading = false;

      console.log("Prueba1");
      console.log(data);
    });
  }

  getCityForecast(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.API_KEY}&lang=es`);
    this.isLoading = false;


  }


  getCityWeather2(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&lang=es`).pipe(
      tap(data => {
        this.weatherDataSubject.next(data);
        this.isLoading = false;
        console.log("Prueba1");
        console.log(data);
      })
    );
  }



  updateForecastData(forecastData: any): void {
    this.forecastDataSubject.next(forecastData);
  }


  getCitySuggestions(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.API_KEY}`);
  }


  updateWeatherAndForecast(locationName: string) {
    this.getCityWeather2(locationName).subscribe(weatherData => {
      this.weatherDataSubject.next(weatherData);
    });
    this.getCityForecast(locationName).subscribe(forecastData => {
      this.forecastDataSubject.next(forecastData);
    });
  }

}


