import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { AlertComponent } from './components/alert/alert.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    MapaComponent,
    AlertComponent,



  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,


  ],
})

export class SharedModule {}
