import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;
  private currentLayer: L.TileLayer | null = null;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map');

    navigator.geolocation.getCurrentPosition((position) => {
      this.map.setView([position.coords.latitude, position.coords.longitude], 13);
    });

    this.setLayer('standard');
  }

  public setLayer(layer: string): void {
    let url: string;

    switch (layer) {
      case 'temperature':
        url = 'https://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png';
        break;
      case 'precipitation':
        url = 'https://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png';
        break;
      case 'clouds':
        url = 'https://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png';
        break;
      default:
        url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        break;
    }

    // Remueve la capa existente antes de agregar la nueva
    if (this.currentLayer) {
      this.map.removeLayer(this.currentLayer);
    }

    const newLayer = L.tileLayer(url, {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.openweathermap.org/">OpenWeatherMap</a>',
      id: 'openweathermap.' + layer,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: '9e12ce681891bbfbbfce1e15fbad0f67'
    });

    newLayer.addTo(this.map);
    this.currentLayer = newLayer;
  }
}
