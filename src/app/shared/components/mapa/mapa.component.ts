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

    // Establece la vista para mostrar todo el mundo
    this.map.setView([0, 0], 2);

    
  }

  public setLayer(layer: string): void {
    let url: string;

    switch (layer) {
      case 'temperature':
        url = 'https://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=9e12ce681891bbfbbfce1e15fbad0f67';
        break;
      case 'precipitation':
        url = 'https://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=9e12ce681891bbfbbfce1e15fbad0f67';
        break;
      case 'clouds':
        url = 'https://{s}.tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=9e12ce681891bbfbbfce1e15fbad0f67';
        break;
      default:
        url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        break;
    }

    // Remueve la capa existente antes de agregar la nueva
    if (this.currentLayer) {
      this.map.removeLayer(this.currentLayer);
    }

    const newLayer = new L.TileLayer(url, {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.openweathermap.org/">OpenWeatherMap</a>',
      id: 'openweathermap.' + layer,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: '9e12ce681891bbfbbfce1e15fbad0f67'
    });

    // Agrega el nuevo layer al mapa
    newLayer.addTo(this.map);

    // Actualiza el mapa para asegurarse de que se muestren los cambios
    this.map.invalidateSize();

    // Almacena la referencia al nuevo layer
    this.currentLayer = newLayer;
  }
}
