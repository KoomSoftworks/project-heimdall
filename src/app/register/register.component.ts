import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterEvent } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
 

  formularioc:FormGroup; 
  
  constructor(public auth: AngularFireAuth, private fb:FormBuilder, private bd: AngularFirestore) {
    
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
    
    console.log(this.formularioc.value.email)
    this.bd.collection('clientes').add(this.formularioc.value).then((termino)=>{
      console.log(this.formularioc.value)
    })

    this.auth.createUserWithEmailAndPassword(this.formularioc.value.email,this.formularioc.value.password).then((termino)=>{
      console.log("el usuario ", this.formularioc.value.email," con la contraseña ", this.formularioc.value.password, " Se agregos porfa checalo")
    })
  
  }

  



  }
  

  




