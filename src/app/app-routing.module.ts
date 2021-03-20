import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent} from './menu/menu.component';
import {DetalleComponent} from './detalle/detalle.component'

const routes: Routes = [{
  path:'',
  redirectTo:'/main',
  pathMatch:'full'
},
{
  path:'main',
  component:MenuComponent,
  canActivate: []
},
{
  path: 'detalles/:id',
  component: DetalleComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
