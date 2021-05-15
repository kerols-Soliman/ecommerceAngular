import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/config';
import { ICategroy, ICategroyOfProduct } from '../interface/Categroy';
import { IProduct } from '../interface/Product';

@Injectable({
  providedIn: 'root'
})
export class CategroyService {

  constructor(private http : HttpClient) {   }

  url:string = apiUrl+"api/Categories"   
  
  getAllCategories():Observable<ICategroy[]>{
    return this.http.get<ICategroy[]>(this.url).pipe(catchError(
      (err)=>{return throwError(err.message || "Server Error")})
    )
  }

  
  
  postCategory(categ:ICategroy){
    return this.http.post<ICategroy>(this.url,categ).pipe(catchError(
      err=>{return throwError(err.message || "An Error Occure")}))
  }

  DeleteCategory(id){

    return this.http.delete<ICategroy>(this.url+"/"+id).pipe(catchError(err=>{
      console.log(err)
      return throwError(err.message|| "An Error Occure");
    }))
    console.log("delete serve")
  }
 

  GetById(id: number) {
    
    return this.http.get<ICategroyOfProduct>( this.url + "/" + id).pipe(catchError(err => {
      return throwError(err.message || "There is an error");
    }))
  }
  UpdateCategory(category:ICategroy,id:number)
  {
    const updateUrl = this.url + "/" + id;
    return this.http.put<ICategroy>(updateUrl,category).pipe(catchError((err)=>
    {
      return throwError(err.message || "there is an Error");
     }));
  }
   

  getAllCategoryProducts(id:number){
    return this.http.get<IProduct[]>(this.url2+"/"+id).pipe(catchError(
      (err)=>{return throwError(err.message || "Server Error")})
    )
  }
  url2:string = apiUrl+"api/ProductsCategory"

  
}
