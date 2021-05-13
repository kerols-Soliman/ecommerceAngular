import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/config';
import { ILogUser } from '../interface/LogUeser';
import { IUser } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
   url=apiUrl+"api/Accounts";

  postUser(user:IUser){
    console.log("in serve");
   return this.http.post<IUser>(this.url,user).pipe(catchError(
      err=>{return throwError(err.message || "An Error Occure")}))
  }

  LoginUser(user:ILogUser){
    console.log("in Log in");

    var data="username="+user.username+"&password="+user.password+"&grant_type=password"
    let reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
   return this.http.post(apiUrl+"login",data,{headers:reqHeader})
  }

  isAuthenticated(): boolean{
    if (localStorage.getItem('userToken')){
      return true;
    }
    else{
      return false;
    }
  }
}
