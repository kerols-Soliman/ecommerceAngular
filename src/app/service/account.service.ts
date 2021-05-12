import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/config';
import { IUser } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  url=apiUrl+"/api/Accounts";

  postUser(user:IUser){
    console.log("in serve");
   return this.http.post<IUser>(this.url,user).pipe(catchError(
      err=>{return throwError(err.message || "An Error Occure")}))
  }
}
