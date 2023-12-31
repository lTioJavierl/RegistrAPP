import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeProfesorPageRoutingModule } from './home_profesor-routing.module';

import { HomeProfesorPage } from './home_profesor.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeProfesorPageRoutingModule,
    SharedModule,
    QRCodeModule
  ],
  declarations: [HomeProfesorPage]
})
export class HomeProfesorPageModule {}
