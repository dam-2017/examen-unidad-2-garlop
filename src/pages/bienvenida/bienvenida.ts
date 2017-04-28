import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Registro } from '../registro/registro';

/**
 * Generated class for the Bienvenida page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html',
})
export class Bienvenida {

  public usuario:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Bienvenida');
    this.storage.ready().then(()=>{
      this.storage.get('user').then((valor)=>{
        this.usuario = valor;
      });
    });
  }

  registrarProveedor(){
    this.navCtrl.push(Registro);
  }
}
