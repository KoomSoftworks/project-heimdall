import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import {AngularFirestoreDocument} from '@angular/fire/firestore'
import * as firebase from 'firebase';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  clientes: any[] =new Array<any>();
  formularioLogin:FormGroup
  dc:boolean=true;
  usuario: User;
  cargando:boolean=true;
  textoError: string = ''
  
  constructor(public auth: AngularFireAuth, public cf:FormBuilder, public spinner: NgxSpinnerService,
    public bd: AngularFirestore, public router: Router) {

      
    
    this.auth.user.subscribe((user)=>{
      
      this.cargando=false;
      this.usuario = user;
      
    })
    console.log(this.usuario);
    console.log(this.cargando);
    if(this.usuario){
      console.log('nav');
      this.router.navigate(['main/home'], { state: { loggedIn: true } });
    }

   }
   

   

  ngOnInit(): void {

    this.bd.collection('clientes').valueChanges().subscribe((resultado)=>{
      this.clientes = resultado;
    })

    this.formularioLogin=this.cf.group({
      email:['',Validators.compose([
        Validators.required,Validators.email
      ])],
      password:['',Validators.required]
    });
  }

  onFacebookLogin(){
    // Sign in using a redirect.
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token.
      
      // The signed-in user info.
      var user = result.user;
    });




  }

  onGoogleLogin(){
   
    var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithPopup(provider).then(
 (usuario)=>{
  console.log(usuario)
  this.spinner.hide();
  this.router.navigate(['main/home'], { state: { loggedIn: true } });
}).catch((error)=>{
  this.dc = false;
  this.textoError = error.message;
  this.spinner.hide();
  
})   
  }
  

  ingresar(){

    if(this.formularioLogin.valid){
      this.dc =true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password)
      .then((usuario)=>{
        console.log(usuario)
        this.spinner.hide();
        this.router.navigate(['main/home'], { state: { loggedIn: true } });
      }).catch((error)=>{
        this.dc = false;
        this.textoError = error.message;
        this.spinner.hide();

      })
    }else{
    this.dc=false;
    this.textoError = 'Por favor revisa que los datos esten correctos'
  }
}

  logo(){
    this.auth.signOut();
  }

}


