import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  private host = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  startExecution = (url: string, label: string, browser: string): Promise<object> => {
    const data = {url, label, browser};
    return this.http.post(this.host + '/execute', data).toPromise();
  }

}
