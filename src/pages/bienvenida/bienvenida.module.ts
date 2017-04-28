import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Bienvenida } from './bienvenida';

@NgModule({
  declarations: [
    Bienvenida,
  ],
  imports: [
    IonicPageModule.forChild(Bienvenida),
  ],
  exports: [
    Bienvenida
  ]
})
export class BienvenidaModule {}
