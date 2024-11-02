import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { ViewFrameComponent } from './view-frame/view-frame.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewFrameComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MainRoutingModule
  ]
})
export class MainModule { }
