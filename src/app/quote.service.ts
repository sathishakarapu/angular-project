import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  constructor(private http:HttpClient) {}

  loadQuotes(){
    return this.http.get("https://qapi.vercel.app/api/quotes");
  }
}
