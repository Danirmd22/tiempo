import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  citySuggestions: any[] = [];
  autocompleteResults: any[] = []; // añade esta línea

  constructor(private weatherService: WeatherService,private dialog: MatDialog,private router:Router,private http : HttpClient,private changeDetector: ChangeDetectorRef) { }

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


  register() {
    this.router.navigate(['/registro']);
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



  onBlur() {
    this.autocompleteResults = [];
  }

  onInput(event: any) {
    const query = event.target.value;
    if (query.length >= 3) {
      this.weatherService.getAutocompleteResults(query).subscribe(results => {
        this.autocompleteResults = results.data;
      });
    } else {
      this.autocompleteResults = [];
    }
  }




}
