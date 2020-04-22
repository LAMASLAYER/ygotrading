import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(http: HttpClient) {
    this.http = http;
  }

  http: HttpClient;

  public getCards(input: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>('http://localhost:5000/get', {headers: {query: input}});
  }

}
