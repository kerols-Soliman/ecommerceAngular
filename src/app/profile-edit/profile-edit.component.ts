import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { apiUrl } from 'src/config';
import { ConfirmPasswordValidator } from '../ConfirmPasswordValidator';
import { IUser } from '../interface/User';
import { AccountService } from '../service/account.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { FileUploadServiceService } from '../service/file-upload-service.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  constructor(private accountService:AccountService,private fb:FormBuilder
    ,private fileService:FileUploadServiceService,private sharedDataService:DataSharingServiceService) { }

  
  url=String(apiUrl)
  user:IUser;
  gender=["Male","Female"];
  genderNumber
  photo;
  newPhoto
  FileToUpload:File=null
  
  ngOnInit(): void {
    this.accountService.GetUser().subscribe(data=>{
      this.user=data;
      
      this.registForm.patchValue({
        Name:this.user.Name,
        Email:this.user.Email,
        Gender:this.user.Gender,
      })
      this.photo=this.user.Image
      this.genderNumber=this.user.Gender
      this.newPhoto= this.user.Image.replace((this.url).toString(),"").replace(("Image/").toString(),"")
    });
  }
    
  
  registForm=this.fb.group({
    Name:['',[Validators.required,Validators.minLength(4)]],
    Email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],  
    Password:['',[Validators.required,Validators.minLength(8)]],  
    confirmPassword:['',[Validators.required,Validators.minLength(8)]],          
    Gender:['',[Validators.required]],  
    Image:['']
  },{validator:[ConfirmPasswordValidator]}as any)


  handleFileInput(file:FileList){
    this.FileToUpload=file.item(0);
    var render = new FileReader();
    render.onload=(event:any)=>{
      this.photo=event.target.result
    }
    render.readAsDataURL(this.FileToUpload)
  }
  updateUser:IUser
  update(){
    this.updateUser={
      "Name":this.Name.value,
      "Email":this.Email.value,
      "Password":this.Password.value,
      "confirmPassword":this.confirmPassword.value,
      "Gender":this.Gender.value,
      "Image":this.newPhoto
    }
    if(this.FileToUpload != null){
      this.fileService.postFile(this.FileToUpload).subscribe(da=>{})
      this.updateUser.Image=this.FileToUpload.name;
    }
    this.accountService.Edit(this.updateUser).subscribe(d=>console.log(d))
    this.sharedDataService.IsUserLogIn.next(true)
  }


  get Name(){    return this.registForm.get("Name")   }  
  get Email(){    return this.registForm.get("Email")    }
  get Password(){    return this.registForm.get("Password")   }
  get confirmPassword(){    return this.registForm.get("confirmPassword")   }
  get Gender(){    return this.registForm.get("Gender")   }
  get Image(){    return this.registForm.get("Image")   }
}
