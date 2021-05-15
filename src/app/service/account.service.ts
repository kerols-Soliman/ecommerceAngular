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

  GetUser(){
    return this.http.get<IUser>(this.url,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(catchError(err=>
      {return throwError(err.message||"an error occur")})
    );
  }
 
  Edit(user:IUser){
    return this.http.put<IUser>(this.url,user,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('userToken')}
    )}).pipe(catchError(
      err=>{return throwError(err.message || "An Error Occure")}))
  }

  postUser(user:IUser){
    return this.http.post<IUser>(this.url,user).pipe(catchError(
      err=>{return throwError(err.message || "An Error Occure")}))
  }

  LoginUser(user:ILogUser){
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
