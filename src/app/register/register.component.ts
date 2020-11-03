import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringify } from '@angular/compiler/src/util';
import * as firebase from 'firebase';
import { setDefaultService } from 'selenium-webdriver/chrome';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  textoErrorr: string = ''
  formularioc:FormGroup; 
  dcr:boolean=true;
  
  
  constructor(public auth: AngularFireAuth, private fb:FormBuilder, private bd: AngularFirestore,
    public spinner: NgxSpinnerService, public router: Router) {
    
  }
  
  ngOnInit(): void {

    this.formularioc = this.fb.group({
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      user:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
      
    })
    
     const url=this.router.url;
      
     
  }
  
  agregar(){
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:4200/start/login',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'http://localhost:4200/start/home'
    };
    
    
    if (this.formularioc.valid) {
      this.dcr =true;
      firebase.auth().sendSignInLinkToEmail(this.formularioc.value.email, actionCodeSettings)
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        console.log("si esat pasando por aqui")
        window.localStorage.setItem('emailForSignIn', this.formularioc.value.email);
        alert("Te mandamos un Email de confirmacion")
      })
      .catch(function(error) {
        this.textoErrorr = error.message;
      });
    
      console.log(this.formularioc.value.email)
    this.bd.collection('clientes').add(this.formularioc.value).then((termino)=>{
      console.log(this.formularioc.value)
    })
    
    this.auth.createUserWithEmailAndPassword(this.formularioc.value.email,this.formularioc.value.password).then((termino)=>{
      
      console.log("el usuario ", this.formularioc.value.email," con la contraseña ", this.formularioc.value.password, " Se agregos porfa checalo")
      alert("El user fue agregado correctamente")
      this.dcr =true;
      this.router.navigate(['start/login'], { state: { loggedIn: true } });
    }).catch((error)=>{
      this.dcr =false;
      this.textoErrorr = error.message;
      this.spinner.hide();

      
    })
    
      
    }else{
      this.dcr=false;      
      alert("Formulario incorrecto")
      this.textoErrorr = 'Lo siento puede ser que este usuario ya esta registrado'
      
    }
    
    
  }

  



  }
  

  




