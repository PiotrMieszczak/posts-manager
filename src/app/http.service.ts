import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(environment.apiUrl + url);
  }

  public patch(url: string, payload: string): Observable<any> {
    return this.http.patch(environment.apiUrl + url, payload, httpOptions);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(environment.apiUrl + url);
  }

  public post(url: string, payload: object): Observable<any> {
    return this.http.post(
      environment.apiUrl + url,
      JSON.stringify(payload),
      httpOptions
    );
  }
}
