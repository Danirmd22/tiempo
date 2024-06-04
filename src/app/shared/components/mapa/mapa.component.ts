import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;
  private baseLayer!: L.TileLayer;
  private precipitationLayer!: L.TileLayer;
  private temperatureLayer!: L.TileLayer;
  private cloudsLayer!: L.TileLayer;

  ngAfterViewInit(): void {
    this.initMap();
    this.initLayers();
    this.showLayer('precipitation');
    this.addLayersControl();
    this.styleLayersControl();
  }

  private initMap(): void {
    this.map = L.map('map').setView([37.4637, -3.7492], 6);

    // Agrega la capa de mapa base de OpenStreetMap
    this.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }


  private styleLayersControl(): void {
    const layersControl = document.querySelector('.leaflet-control-layers');
    if (layersControl) {
      layersControl.classList.add('bg-gray-200', 'text-sm', 'rounded-md', 'shadow-lg', 'p-3');

      const checkboxes = layersControl.querySelectorAll('input[type=checkbox]');
      checkboxes.forEach(checkbox => {
        checkbox.classList.add('text-blue-500', 'checked:bg-blue-500', 'checked:border-transparent');
      });
    }
  }

  private initLayers(): void {
    const apiKey = '9e12ce681891bbfbbfce1e15fbad0f67'; // Reemplace esto con su clave de API

    this.precipitationLayer = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=' + apiKey, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
    });

    this.temperatureLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=' + apiKey, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
    });

    this.cloudsLayer = L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=' + apiKey, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
    });
  }

  public showLayer(layer: 'precipitation' | 'temperature' | 'clouds'): void {
    // Primero, elimina todas las capas existentes
    this.map.eachLayer(l => {
      if (l !== this.baseLayer) {
        this.map.removeLayer(l);
      }
    });

    // Luego, agrega el mapa base de nuevo para asegurarse de que esté debajo de las capas
    this.baseLayer.addTo(this.map);

    // Luego, agrega la capa seleccionada
    switch (layer) {
      case 'precipitation':
        this.precipitationLayer.addTo(this.map);
        break;
      case 'temperature':
        this.temperatureLayer.addTo(this.map);
        break;
      case 'clouds':
        this.cloudsLayer.addTo(this.map);
        break;
    }
  }

  private addLayersControl(): void {
    const baseLayers = {
      'Mapa Base': this.baseLayer
    };

    const overlayLayers = {
      'Precipitación': this.precipitationLayer,
      'Temperatura': this.temperatureLayer,
      'Nubes': this.cloudsLayer
    };

    L.control.layers(baseLayers, overlayLayers).addTo(this.map);
  }
}
