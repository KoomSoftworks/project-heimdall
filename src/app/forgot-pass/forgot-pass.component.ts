import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  formulariorp:FormGroup
 
  constructor(public auth: AngularFireAuth, public cf:FormBuilder, public bd: AngularFirestore, public router: Router ) { }
 
  ngOnInit(): void {
    

    this.formulariorp=this.cf.group({
      email:['',Validators.compose([
        Validators.required,Validators.email
      ])],
     
    });
  }
   onReset() {

    if(this.formulariorp.valid){
      
      var email = this.formulariorp.value.email;
      
      try {
        this.auth.sendPasswordResetEmail(email).then(function() {
          window.alert('Email sent, check your inbox!');
          this.router.navigate([''], { state: { loggedIn: true } });
        }).catch((error)=>{
          this.router.navigate([''], { state: { loggedIn: true } });
       
        });
        } catch (error) {
        console.log(error);
        }
      
    }else{
      window.alert("error algo inestperado sucedio");
  }
}

    
    
}