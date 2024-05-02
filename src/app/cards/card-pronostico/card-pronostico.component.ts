import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-card-pronostico',
  templateUrl: './card-pronostico.component.html',
  styleUrl: './card-pronostico.component.css'
})
export class CardPronosticoComponent {
  @Input() weatherData: any;
  @Input() forecastData: any;
  faDroplet = faDroplet;
}
