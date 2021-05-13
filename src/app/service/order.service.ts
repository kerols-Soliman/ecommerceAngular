import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { apiUrl } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }
  url:string = apiUrl+"api/Order"

  PostOrder(){
    return this.http.post(this.url,{headers:new HttpHeaders(

      {"Authorization":"Bearer "+localStorage.getItem('userToken')}

    )}).pipe(catchError(
      (err)=>{return throwError(err.message || "Server Error")})
    )
  }
  GetOrders(){
    return this.http.get(this.url,{headers:new HttpHeaders(

      {"Authorization":"Bearer "+localStorage.getItem('userToken')}

    )}).pipe(catchError(
      (err)=>{return throwError(err.message || "Server Error")})
    )
  }  
}
