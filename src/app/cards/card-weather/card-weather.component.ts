import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { setDoc } from 'firebase/firestore';
import { doc } from "firebase/firestore";
import { getDoc } from 'firebase/firestore';
import { updateDoc, arrayUnion } from "firebase/firestore";
@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrl: './card-weather.component.css'
})
export class CardWeatherComponent {
  @Input() weatherData: any;
  @Input() showData: boolean = true;
  url = 'https://openweathermap.org/img/wn/';
  iconUrl = '';
  location: {name: string, latitude: number, longitude: number} = {name: '', latitude: 0, longitude: 0};

  isLoggedIn: boolean = false;
  city: string = "" // Agrega esta línea
  // Agrega esta línea;

  days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  constructor(private cdr: ChangeDetectorRef,private http: HttpClient,private weatherService: WeatherService) {
     }


  ngOnInit(): void {


    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    this.weatherService.weatherData$.subscribe(data => {
      this.weatherData = data;
      if (this.weatherData && this.weatherData.weather && this.weatherData.weather[0]) {
        this.iconUrl = this.url + this.weatherData.weather[0].icon + '@4x.png';
      }
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && changes['weatherData'].currentValue) {
      this.weatherData = changes['weatherData'].currentValue;
      console.log(this.weatherData); // Imprime los datos del clima en la consola
      if (this.weatherData && this.weatherData.weather && this.weatherData.weather[0]) {
        this.iconUrl = this.url + this.weatherData.weather[0].icon + '@4x.png';
      }
    }
  }


  async saveLocation(location: {name: string, latitude: number, longitude: number}) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.uid;

    const db = getFirestore();
    const userDoc = doc(db, "users", userId);

    // Obtén el documento actual
    const docSnapshot = await getDoc(userDoc);

    if (docSnapshot.exists()) {
      // Si el documento existe, añade la nueva ubicación a la matriz existente
      await updateDoc(userDoc, {

        locations: arrayUnion({
          name: this.weatherData?.name,
          latitude: this.weatherData?.coord.lat,
          longitude: this.weatherData?.coord.lon
        })

      });

    } else {
      // Si el documento no existe, crea uno nuevo
      await setDoc(userDoc, {

        locations: [{
          name: this.weatherData?.name,
          latitude: this.weatherData?.coord.lat,
          longitude: this.weatherData?.coord.lon
        }]
      });


      
    }
  }

}
