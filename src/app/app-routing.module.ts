import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcilComponent } from './bcil/bcil.component';


const routes: Routes = [
  { path: '',redirectTo: 'bcil', pathMatch: 'full'},
  { path: 'bcil', component:BcilComponent, loadChildren: () => import('./bcil/bcil.module').then(m => m.BcilModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
