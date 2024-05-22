import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { tap } from 'rxjs';
import { collection, getDocs } from "firebase/firestore";

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
  alertForCity: string = '';

  showAlert: boolean = false;
  alertMessage: string = '';

  weatherData$ = this.weatherDataSubject.asObservable();
  forecastData$ = this.forecastDataSubject.asObservable();
  isLoading = true;
  private API_KEY = '9e12ce681891bbfbbfce1e15fbad0f67';

  constructor(private http: HttpClient) { }

  getCityWeather(city: string): void {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&lang=es`).subscribe(async (data: any) => {
      this.weatherDataSubject.next(data);

      this.isLoading = false;
      localStorage.setItem('city', data.name.toLowerCase());

      console.log("Prueba1");
      console.log(data);

      // Obtén las alertas
      const alerts = await this.getAlerts();
      console.log('Alertas obtenidas de la base de datos:', alerts);

      // Obtiene la ciudad almacenada en localStorage
      const storedCity = localStorage.getItem('city');

      // Verifica si la ciudad almacenada coincide con alguna de las ciudades en las alertas
      const alertForCity = alerts.find(alert => alert['City'] && alert['City'].toLowerCase() === storedCity?.toLowerCase());
      console.log('Alerta para la ciudad:', alertForCity);

      if (alertForCity) {

        alert('Alerta para la ciudad de ' + storedCity + ': ' + alertForCity['Message']);

      }
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


  async getAlerts() {
    const db = getFirestore();
    const alertCol = collection(db, 'alerts');
    const alertSnapshot = await getDocs(alertCol);
    const alerts = alertSnapshot.docs.map(doc => doc.data());
    return alerts;
  }

}


