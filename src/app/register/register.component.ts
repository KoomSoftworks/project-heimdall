import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  textoErrorr: string = ''
  formularioc:FormGroup; 
  dcr:boolean=true;
  
  
  constructor(public auth: AngularFireAuth, private fb:FormBuilder, private bd: AngularFirestore, public spinner: NgxSpinnerService) {
    
  }
  
  ngOnInit(): void {

    this.formularioc = this.fb.group({
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      user:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
      
    })

     
  }
  
  
  agregar(){
    if (this.formularioc.valid) {
      this.dcr =true;
      this.spinner.show();
      console.log(this.formularioc.value.email)
    this.bd.collection('clientes').add(this.formularioc.value).then((termino)=>{
      console.log(this.formularioc.value)
      this.spinner.hide();
    })

    this.auth.createUserWithEmailAndPassword(this.formularioc.value.email,this.formularioc.value.password).then((termino)=>{
      console.log("el usuario ", this.formularioc.value.email," con la contraseña ", this.formularioc.value.password, " Se agregos porfa checalo")
      alert("El user fue agregado correctamente")
      this.spinner.hide();
      this.dcr =true;
     
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
  

  




