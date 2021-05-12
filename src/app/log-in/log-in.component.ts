import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  LogInForm=this.fb.group({
    UserName:['',[Validators.required,Validators.minLength(4)]],  
    Password:['',[Validators.required,Validators.minLength(8)]],  
  })
  get Email(){
    return this.LogInForm.get("Email")
  }
  get Password(){
    return this.LogInForm.get("Password")
  }

  LogIN(){
   console.log("Login Done");
  }

}
