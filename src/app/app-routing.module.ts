import { RegistroComponent } from './shared/components/registro/registro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandComponent } from './land/land.component';
import { MapaComponent } from './shared/components/mapa/mapa.component';



const routes: Routes = [
  { path: '', component: LandComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mapa', component: MapaComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
