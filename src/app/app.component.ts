import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tiempo';
  weatherData: any;
  localTime: string = '';
constructor(private http: HttpClient) { }

ngOnInit() {
  navigator.geolocation.getCurrentPosition((position) => {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9e12ce681891bbfbbfce1e15fbad0f67&lang=es`)
      .subscribe(data => {
        this.weatherData = data;
        const now = new Date();
        const localOffset = now.getTimezoneOffset() * 60;
        const utc = now.getTime() / 1000 + localOffset;
        const localTimeInSeconds = utc + this.weatherData.timezone;
        const localDate = new Date(localTimeInSeconds * 1000);
        const hours = localDate.getHours().toString().padStart(2, '0');
        const minutes = localDate.getMinutes().toString().padStart(2, '0');
        this.localTime = `${hours}:${minutes}`;
        console.log(this.weatherData);
      }, err => {
        console.log(err);
      });
  });

}

}

