import { Component } from '@angular/core';
import { faThermometerEmpty } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-card-sensacion',
  templateUrl: './card-sensacion.component.html',
  styleUrl: './card-sensacion.component.css'
})
export class CardSensacionComponent {
  @Input() weatherData: any;
  faThermometerEmpty = faThermometerEmpty;
  faEye = faEye;

}
