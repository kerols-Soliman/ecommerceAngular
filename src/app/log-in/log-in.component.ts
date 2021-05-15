import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ILogUser } from '../interface/LogUeser';
import { NavbarComponent } from '../navbar/navbar.component';
import { AccountService } from '../service/account.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  user:ILogUser;
  IslogInError:boolean=false;
  constructor(private fb:FormBuilder,private acountService:AccountService,private router:Router,
    private sharedDataService:DataSharingServiceService) { }

  ngOnInit(): void {
  }

  LogInForm=this.fb.group({
    UserName:['',[Validators.required,Validators.minLength(4)]],  
    Password:['',[Validators.required,Validators.minLength(8)]],  
  })
  get Name(){
    return this.LogInForm.get("UserName")
  }
  get Password(){
    return this.LogInForm.get("Password")
  }

  LogIN()
  {
    console.log("Login Done");
    this.user=
    {
      "username":this.Name.value,
      "password":this.Password.value
    }
    

    this.acountService.LoginUser(this.user).subscribe((data)=>
      {
        localStorage.setItem('userToken',data['access_token']);
        localStorage.setItem('userRoles',data['roles']);
        this.sharedDataService.IsUserLogIn.next(true)
        this.router.navigate(['/home']);
      },(err:HttpErrorResponse)=>
      {
        console.log("error Req");
        this.IslogInError=true;
      }
    );
  }

}
