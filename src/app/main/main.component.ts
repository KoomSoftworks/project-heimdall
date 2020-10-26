import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  usuario: User;
  
  constructor(public auth: AngularFireAuth) { 

    this.auth.user.subscribe((user)=>{
      
      
      this.usuario = user;
      
    })
  }

  ngOnInit(): void {
    
  }

  logo(){
    this.auth.signOut();
  }

}
