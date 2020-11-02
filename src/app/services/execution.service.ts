import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  private host = 'localhost:3001/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  startExecution = (url: string, label: string, browser: string): Observable<object> => {
    const data = {url, label, browser};
    return this.http.post(this.host + '/execution', data, this.httpOptions);
  }

}
