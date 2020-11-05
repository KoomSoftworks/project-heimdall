import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExecutionService } from '../services/execution.service';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  progressType = 'determinate';
  progressValue = 0;
  buttonValue = 'Search';
  started = false;
  supportedBrowsers: string[] = [
    'firefox',
    'chrome'
  ];
  labels: string[] = [
    'search',
    'menu',
    'exit',
    'user',
    'phone'
  ];
  imgSource: any = '../../assets/screenshot.png';
  result = [];

  constructor(private executionService: ExecutionService, public router: Router) {
    //console.log(this.router.getCurrentNavigation().extras.state.loggedIn);
    // if (this.router.getCurrentNavigation().extras.state.loggedIn === null || this.router.getCurrentNavigation() === null) {
    //   this.router.navigate(['start/login']);
    // }
  }

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

  onExecution(form: NgForm) {
    if (!this.started) {
      this.buttonValue = 'Stop';
      this.progressType = 'indeterminate';
      this.started = true;
      this.executionService.startExecution(form.value.inUrl, this.myControl.value, form.value.inBrowser).subscribe(responseData => {
        console.log(responseData);
        let newImg = responseData['image'];
        if(newImg != null && newImg.length < 1000) {
          this.imgSource = '../../assets/screenshot.png';
        } else {
          this.convertImage(newImg);
        }
        alert(responseData['message']);
        let resData = responseData['data'];
        this.result.push(resData[0]['xpath-class']);
        this.result.push(resData[0]['xpath-id']);
        this.result.push(resData[0]['xpath-alt']);
        this.result.push(resData[0]['xpath-title']);
        this.buttonValue = 'Search';
        this.progressType = 'determinate';
        this.started = false;
      });
    } else {
      this.buttonValue = 'Search';
      this.progressType = 'determinate';
      this.started = false;
    }

  }

  convertImage(newimg) {
    const imageBlob = this.dataURItoBlob(newimg);
    const imageFile = new File([imageBlob], 'profilePic', {type: 'image/jpeg'});
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (event1) => {
      this.imgSource = event1.currentTarget;
      this.imgSource = this.imgSource.result;
    };
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
 }

}
