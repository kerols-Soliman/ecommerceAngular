import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../interface/User';
import { AccountService } from '../service/account.service';
import { FileUploadServiceService } from '../service/file-upload-service.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class Regist2Component implements OnInit {

  constructor(private fb:FormBuilder,private account:AccountService,private fileUploadservice:FileUploadServiceService) { }

  ngOnInit(): void {
  }

  newUser:IUser;
  FileToUpload:File;
  photo='assets/Image/person.png';
  gender=["Male","Female"]

  registForm=this.fb.group({
    Name:['',[Validators.required,Validators.minLength(4)]],
    Email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],  
    Password:['',[Validators.required,Validators.minLength(8)]],  
    confirmPassword:['',[Validators.required,Validators.minLength(8)]],          
    Gender:['',[Validators.required]],  
    Image:['',[Validators.required]]
  })

  handleFileInput(file:FileList){
    this.FileToUpload=file.item(0);
    var render = new FileReader();
    render.onload=(event:any)=>{
      this.photo=event.target.result
    }
    render.readAsDataURL(this.FileToUpload)
  }
  
  
  add(){
    this.newUser={
      "Name":this.Name.value,
      "Email":this.Email.value,
      "Password":this.Password.value,
      "confirmPassword":this.confirmPassword.value,
      "Gender":this.Gender.value,
      "Image":this.FileToUpload.name
    }
    this.fileUploadservice.postFile(this.FileToUpload).subscribe(data=>console.log(data))
    this.account.postUser(this.newUser).subscribe(data=>console.log(data))
    
  }



  get Name(){
    return this.registForm.get("Name")
  }
  get Email(){
    return this.registForm.get("Email")
  }
  get Password(){
    return this.registForm.get("Password")
  }
  get confirmPassword(){
    return this.registForm.get("confirmPassword")
  }
  get Gender(){
    return this.registForm.get("Gender")
  }
  get Image(){
    return this.registForm.get("Image")
  }
  
}
