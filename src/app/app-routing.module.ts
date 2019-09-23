import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VosDemoComponent } from './vos-demo/vos-demo.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: VosDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
