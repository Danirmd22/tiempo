import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { CardWeatherComponent } from './cards/card-weather/card-weather.component';
import { CardPronosticoComponent } from './cards/card-pronostico/card-pronostico.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    AppComponent,
      WeatherComponent,
      CardWeatherComponent,
      CardPronosticoComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule





  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
