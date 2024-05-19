import { RegistroComponent } from './shared/components/registro/registro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandComponent } from './land/land.component';




const routes: Routes = [
  { path: '', component: LandComponent },
  { path: 'registro', component: RegistroComponent },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
