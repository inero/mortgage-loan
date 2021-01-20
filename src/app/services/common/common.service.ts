import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> {

  public baseUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {

  }

  public get(endpoint: string, id: string): Observable<T> {
    const params = new HttpParams();
    let headers = new HttpHeaders();
    let endPoint: string;
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    endPoint = id ? this.baseUrl.concat(endpoint).concat('/').concat(id) : this.baseUrl.concat(endpoint);
    return this.http.get<T>(endPoint, { headers, params });
  }

  public post(endpoint: string, postData: any): Observable<T> {
    const params = new HttpParams();
    let headers = new HttpHeaders();
    let endPoint: string;
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    endPoint = this.baseUrl.concat(endpoint);
    return this.http.post<T>(endPoint, postData, { headers, params });
  }

  public delete(endpoint: string, id: string) {
    const params = new HttpParams();
    let headers = new HttpHeaders();
    let endPoint: string;
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    endPoint = this.baseUrl.concat(endpoint).concat('/').concat(id);
    return this.http.delete<T>(endPoint, { headers, params });
  }

  public put(endpoint: string, postData: any, id: string): Observable<T> {
    const params = new HttpParams();
    let headers = new HttpHeaders();
    let endPoint: string;
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    endPoint = id ? this.baseUrl.concat(endpoint).concat('/').concat(id) : this.baseUrl.concat(endpoint);
    return this.http.put<T>(endPoint, postData, { headers, params });
  }

}
