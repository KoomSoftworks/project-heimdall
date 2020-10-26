import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth, User } from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';



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
  
  constructor(public auth: AngularFireAuth,public cf:FormBuilder,public spinner: NgxSpinnerService,public bd: AngularFirestore) {
    
    
    
    this.auth.user.subscribe((user)=>{
      
      this.cargando=false;
      this.usuario = user;
      
    })


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

  ingresar(){

    if(this.formularioLogin.valid){
      this.dc =true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password)
      .then((usuario)=>{

        console.log(usuario)
        this.spinner.hide();
      }).catch((error)=>{
        this.spinner.hide();
      })
    }else{
    this.dc=false;
  }
}

  logo(){
    this.auth.signOut();
  }



}


