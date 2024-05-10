import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  {
  city: string = '';weatherData: any;
  forecastData: any;
  isLoggedIn = false;
  user: any; // define la propiedad 'user' aquí

  constructor(private weatherService: WeatherService,private dialog: MatDialog) { }

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
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  openDialogLogin() {
    let dialogLogin;
    let dialogWidth = window.matchMedia('(max-width: 768px)').matches ? '90%' : '60%';

    dialogLogin = this.dialog.open(LoginComponent, {
        maxWidth: '110%',
        height: 'auto',
        width: dialogWidth,
        maxHeight: '120vh',
    });
    dialogLogin.afterClosed().subscribe(() => {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    });
  }

  onLoginSuccess() {
    this.isLoggedIn = true;
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Limpiar los datos del usuario del almacenamiento local
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      location.reload();
    }).catch((error) => {
      console.error(error);
    });
  }


}
