import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExecutionService } from '../services/execution.service';

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
=======
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  progressType = 'determinate';
  progressValue = 0;
  buttonValue = 'Search';
  started = false;
  supportedBrowsers: string[] = [
    'Firefox',
    'Chrome'
  ];
  labels: string[] = [
    'search',
    'menu',
    'exit',
    'user'
  ];

  constructor(private executionService: ExecutionService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.labels.filter(option => option.toLowerCase().includes(filterValue));
  }

  onExecution = (form: NgForm): void => {
    if (!this.started) {
      this.buttonValue = 'Stop';
      this.progressType = 'indeterminate';
      this.started = true;
      this.executionService.startExecution(form.value.inUrl, this.myControl.value, form.value.inBrowser).then((responseData) => {
        console.log(responseData);
      });
    } else {
      this.buttonValue = 'Search';
      this.progressType = 'determinate';
      this.started = false;
    }

  }

}
