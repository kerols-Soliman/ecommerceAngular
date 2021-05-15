import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/config';
import { IProduct } from '../interface/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  url=apiUrl+"api/Cart"

  getproductInCart(){
    return this.http.get<IProduct[]>(this.url,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(
      catchError((err)=>{return throwError(err.message||'An error Occure')})
    )
  }

  post(productID,qty){
    return this.http.post<IProduct>(this.url+"/"+productID+"/"+qty,"",{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(
      catchError((err)=>{return throwError(err.message||'An error Occure')})
    )
  }

  edit(productId,product){
    return this.http.put(this.url+"/"+productId,product,{headers:new HttpHeaders(
        {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(catchError(err=>{return throwError(err.message||"error occure")}))
  }

  deleteFromCart(pro_Id:number)
  {
    return this.http.delete(this.url+"/"+pro_Id,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(catchError(err=>{return throwError(err.message||"error occure")}))
  }
}
