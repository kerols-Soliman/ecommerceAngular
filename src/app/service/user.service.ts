import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/config';
import { IUser } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  url= apiUrl+"api/Account";

  GetUser(id:string){
    this.http.get<IUser>(this.url+"/"+id).subscribe(data=>console.log(data))
  }
  regist(user:IUser){
    return this.http.post<IUser>(this.url,user).pipe(catchError(err=>{return throwError(err.message || "error occure")}))
  }


  // Regist(user:IUser){
   
  //   console.log("++"+user)
  //    this.http.post(this.url,user)
  //   //  .pipe(catchError(err=>
  //   //     {return throwError(err.message ||"An error occure")}))
  //   console.log("++"+user)
  // }
  // post(s:string){
  //   return this.http.post<IUser>(this.url,s).pipe(catchError(err=>
  //         {return throwError(err.message ||"An error occure")}))
  // }

  
}
