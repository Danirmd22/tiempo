import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-tilelayer-colorpicker';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;
  private precipitationLayer!: L.TileLayer;
  private temperatureLayer!: L.TileLayer;
  private cloudsLayer!: L.TileLayer;

  ngAfterViewInit(): void {
    this.initMap();
    this.initLayers();
    this.showLayer('precipitation');
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 2);
  }

  private initLayers(): void {
    const apiKey = '9e12ce681891bbfbbfce1e15fbad0f67';
    this.precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`);
    this.temperatureLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`);
    this.cloudsLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`);
  }

  public showLayer(layer: 'precipitation' | 'temperature' | 'clouds'): void {
    this.map.eachLayer(l => this.map.removeLayer(l));
    switch (layer) {
      case 'precipitation':
        this.map.addLayer(this.precipitationLayer);
        break;
      case 'temperature':
        this.map.addLayer(this.temperatureLayer);
        break;
      case 'clouds':
        this.map.addLayer(this.cloudsLayer);
        break;
    }
  }
}
