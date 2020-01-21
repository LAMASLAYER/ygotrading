import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiResponse} from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(http: HttpClient) {
    this.http = http;
  }

  http: HttpClient;

  public getCards(input: string) {
    return this.http
      .get('http://localhost:5000/get', {headers: {query: input}});
  }

}
