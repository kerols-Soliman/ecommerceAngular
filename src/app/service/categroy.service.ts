import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/config';
import { ICategroy } from '../interface/Categroy';

@Injectable({
  providedIn: 'root'
})
export class CategroyService {

  constructor(private http : HttpClient) {
   }

   url:string = apiUrl+"api/Categories"     

   getAllCategories():Observable<ICategroy[]>{
    return this.http.get<ICategroy[]>(this.url).pipe(catchError(
       (err)=>{
         return throwError(err.message || "Server Error")
      })
    )
   }
}
