import { HttpClient } from '@angular/common/http';
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

  url=apiUrl+"/api/Cart"

  getproductInCart(){
    return this.http.get<IProduct[]>(this.url).pipe(
      catchError((err)=>{return throwError(err.message||'An error Occure')})
    )
  }

  deleteFromCart(pro_Id:number){
    return this.http.delete(this.url+"/"+pro_Id).pipe(catchError(err=>{return throwError(err.message||"error occure")}))
  }
}
