import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class Registro {

  public registro:FormGroup;

  public nombre:any;
  public apepat:any;
  public apemat:any;
  public fecnac:any;

  public rfc:string;
  public usuario:string;

  public generado:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, public storage:Storage) {
    this.registro = this.formBuilder.group({
      nombre:["", Validators.required],
      apepat:["", Validators.required],
      apemat:["", Validators.required],
      fecnac:["", Validators.compose([Validators.required, Validators.pattern('[0-2][0-9][0-9][0-9]/[0-1][0-9]/[0-3][0-9]')])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
    this.storage.ready().then(()=>{
      this.storage.get('user').then((valor)=>{
        this.usuario = valor;
      });
    })
  }

  generarRFC(){
    this.generado = true;
    if(this.registro.invalid){
      return;
    }
    let nombreIngresado:string = this.registro.get('nombre').value;
    let apepatIngresado:string = this.registro.get('apepat').value;
    let apematIngresado:string = this.registro.get('apemat').value;
    let fecnacIngresado:string = this.registro.get('fecnac').value;
    if(apepatIngresado.length <= 2){
      this.rfc = apepatIngresado.charAt(0).toUpperCase()+apematIngresado.charAt(0).toUpperCase()+nombreIngresado.charAt(0).toUpperCase()+nombreIngresado.charAt(1).toUpperCase()+fecnacIngresado.substring(2,4)+fecnacIngresado.substring(5,7)+fecnacIngresado.substring(8,10)+this.generar3Aleatorios();
    }else{
      this.rfc = apepatIngresado.charAt(0).toUpperCase()+this.primeraVocal(apepatIngresado)+apematIngresado.charAt(0).toUpperCase()+nombreIngresado.charAt(0).toUpperCase()+fecnacIngresado.substring(2,4)+fecnacIngresado.substring(5,7)+fecnacIngresado.substring(8,10)+this.generar3Aleatorios();
    }
  }

  primeraVocal(cadena:string){
    cadena = cadena.toLowerCase();

    let letras = cadena.split('');
    for(var i=1; i<letras.length;i++){
      if('aeiouáéíóú'.includes(letras[i])){
        var cad:string = letras[i];
        cad = cad.replace('á','a');
        cad = cad.replace('é','e');
        cad = cad.replace('í','i');
        cad = cad.replace('ó','o');
        cad = cad.replace('ú','u');

        return cad.toUpperCase();
      }
    }
    var cad:string = letras[1];
    return cad.toUpperCase();
  }

  generar3Aleatorios(){
    var cadena:string = "";
    for(var i=0; i<3;i++){
      cadena+='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random()*37);
    }
    return cadena;
  }
}
