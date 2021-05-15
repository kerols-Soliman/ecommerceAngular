import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/config';
import { IProduct } from '../interface/Product';

@Injectable({
  providedIn: 'root'
})
export class FaviorateService {

  constructor(private http : HttpClient) { }

  url=apiUrl+"api/Faviorate"

  getAllFaviorateProducts(){
    return this.http.get<IProduct[]>(this.url,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(
      catchError((err)=>{return throwError(err.message||'An error Occure')})
    )
  }

  AddProductToFaviorates(pro_Id:number){
    return this.http.post(this.url+"/"+pro_Id,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(catchError(err=>{return throwError(err.message||"error occure")}))
  }

  deleteProductFromFaviorates(pro_Id:number){
    return this.http.delete(this.url+"/"+pro_Id,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(catchError(err=>{return throwError(err.message||"error occure")}))
  }


}
