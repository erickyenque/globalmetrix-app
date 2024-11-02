import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewFrameComponent } from './view-frame/view-frame.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'view-frame', component: ViewFrameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
