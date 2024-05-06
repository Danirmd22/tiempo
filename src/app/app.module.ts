import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { CardWeatherComponent } from './cards/card-weather/card-weather.component';
import { CardPronosticoComponent } from './cards/card-pronostico/card-pronostico.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardSensacionComponent } from './cards/card-sensacion/card-sensacion.component';
import { CardPronosticosemanalComponent } from './cards/card-pronosticosemanal/card-pronosticosemanal.component';
import { FormsModule } from '@angular/forms';


registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
      WeatherComponent,
      CardWeatherComponent,
      CardPronosticoComponent,
      CardSensacionComponent,
      CardPronosticosemanalComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,





  ],
  exports: [

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
