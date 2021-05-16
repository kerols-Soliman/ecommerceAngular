import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
import { apiUrl } from 'src/config';
import { HttpClient } from '@angular/common/http'
import { IProduct } from '../interface/Product';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  url = apiUrl + "api/Products";
  GetById(id: number) {
    const newUrl = this.url + "/" + id;
    return this.http.get<IProduct>(newUrl).pipe(catchError(err => {
      return throwError(err.message || "There is an error");
    }))
  }

  postProduct(product: IProduct) {
    return this.http.post<IProduct>(this.url, product).pipe(catchError(
      (err) => {
        return throwError(err.message || " Server Error");
      }
    ))
  }
  UpdateProduct(product:IProduct,id:number)
  {
    const updateUrl = this.url + "/" + id;
    return this.http.put<IProduct>(updateUrl,product).pipe(catchError((err)=>
    {
      return throwError(err.message || "there is an Error");
     }));
  }

  getProducts() {
    return this.http.get<IProduct[]>(this.url).pipe(catchError(
      (err) => {

        return throwError(err.message || " Server Error");
      }

    ))
  }

  searchByName(pro_Nmae){
    return this.http.get<IProduct[]>(apiUrl+"/api/search/"+pro_Nmae).pipe(catchError(
      (err) => {
        return throwError(err.message || " Server Error");
      }
    ))
  }

  DeleteProduct(id: number) 
  {
    const newUrl = this.url + "/" + id;
    return this.http.delete(newUrl).pipe(catchError(err => {
      return throwError(err.message || "There is an error");
    }))
  }

}
