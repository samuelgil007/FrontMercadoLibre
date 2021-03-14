import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent} from './menu/menu.component'

const routes: Routes = [{
  path:'',
  redirectTo:'/main',
  pathMatch:'full'
},
{
  path:'main',
  component:MenuComponent,
  canActivate: []
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
