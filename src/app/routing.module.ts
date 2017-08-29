import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasComponent } from './datas/datas.component';
import { ParkingsComponent } from './parkings/parkings.component';
import { MapsComponent } from './maps/maps.component';
import { InfosComponent } from './infos/infos.component';
import { Map1sComponent } from './map1s/map1s.component';
import { HomesComponent } from './homes/homes.component';
import { StatsComponent } from './stats/stats.component';
import { SlidersComponent } from './sliders/sliders.component';
import { AppComponent } from './app.component';

//将DatasComponent设置为初始页面

const routes: Routes = [
  { path: '', component: HomesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
