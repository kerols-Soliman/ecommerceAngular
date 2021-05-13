import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategroy } from '../interface/Categroy';
import { CategroyService } from '../service/categroy.service';
import { FileUploadServiceService } from '../service/file-upload-service.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private categoryService:CategroyService,
    private fileUpload:FileUploadServiceService,private route:Router) { }

  newCategory:ICategroy;
  FileToUpload:File=null;
  photo:string="/assets/Image/upload.png";

  createCategoryForm=this.fb.group({
    Name:['',[Validators.required,Validators.minLength(3)]],
    Image:['',Validators.required]
  })

  get Name(){
    return this.createCategoryForm.get("Name");
  }
  get Image(){
    return this.createCategoryForm.get("Image");
  }

  handleFileInput(file:FileList){
    this.FileToUpload=file.item(0);

    var reader = new FileReader();  
    reader.onload = (event: any) => {  
        this.photo = event.target.result;  
    }  
    reader.readAsDataURL(this.FileToUpload);  
  }

  addCategory(){
    this.newCategory={
      "Name":this.Name.value,
      "Image":this.FileToUpload.name
    }
    
    this.fileUpload.postFile(this.FileToUpload).subscribe(data=>console.log(data))
    
    this.categoryService.postCategory(this.newCategory).subscribe(data=>console.log(data))
        
  }
  ngOnInit(): void {
  }

}
