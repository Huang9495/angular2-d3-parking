import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasComponent } from './datas/datas.component';
import { ParkingsComponent } from './parkings/parkings.component';
import { MapsComponent } from './maps/maps.component';
import { Map1sComponent } from './map1s/map1s.component';
import { AppComponent } from './app.component';

//将DatasComponent设置为初始页面

const routes: Routes = [
  { path: '', component: MapsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
