import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  private host = 'https://ves-heimdall.herokuapp.com/api';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  startExecution(url: string, label: string, browser: string) {
    const data = {url, label, browser};
    console.log(data);
    console.log(this.host+'/execution');
    return this.http.post(this.host + '/execution', data, this.httpOptions);
  }
  
}
