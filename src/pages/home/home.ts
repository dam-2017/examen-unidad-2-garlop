import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { Bienvenida } from '../bienvenida/bienvenida';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public formulario:FormGroup;

  public usuario:any;
  public contrasenia:any;

  public user:string;
  public password:string;

  public login:boolean;
  constructor(public navCtrl: NavController, public formBuilder:FormBuilder, public storage:Storage) {
    this.formulario = this.formBuilder.group({
      usuario:["", Validators.compose([Validators.pattern('[a-z]+'), Validators.required, Validators.minLength(6)])],
      contrasenia:["", Validators.compose([Validators.required, Validators.pattern('((.)*[|@#%&](.)*[0-9](.)*)+|((.)*[0-9](.)*[|@#%&](.)*)+'), Validators.minLength(8)])]
    })
  }

  public iniciarSesion(){
    this.login = true;
    if(this.formulario.invalid){
      return;
    }
      this.storage.get('user').then((val)=>{
        if(val == this.user){
          this.storage.get('password').then((valor2)=>{
            if(valor2 == this.password){
              this.navCtrl.setRoot(Bienvenida);
            }else{
              this.formulario.setErrors({
                "not_matching":true
              })
            }
          })
        }else{
          this.formulario.setErrors({
            "not_matching":true
          })
        }
      });  
  }

}
