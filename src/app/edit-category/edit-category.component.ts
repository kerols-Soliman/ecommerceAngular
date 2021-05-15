import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiUrl } from 'src/config';
import { ICategroy } from '../interface/Categroy';
import { CategroyService } from '../service/categroy.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { FileUploadServiceService } from '../service/file-upload-service.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  category:ICategroy;
  imageSrc: string;
  imagePath:any;
  imgURL: any;
  fileToupload:File=null;

  oldImage:any;

  categoryId:number;

  constructor( private CatService:CategroyService,
    private http: HttpClient,
    private fileUploadService:FileUploadServiceService,
    private spinner:NgxSpinnerService,
   private route:Router,private dataSharingService:DataSharingServiceService,
   private fb:FormBuilder,private activeRoute:ActivatedRoute) 
                        { 
                          this.activeRoute.params.subscribe(params=>
                            this.categoryId=params['id']
                            );
                        }
 
  ngOnInit(): void {
     this.spinner.show();
    this.CatService.GetById(this.categoryId).subscribe(Data=>
      {  
         this.category=Data;
         let newurl:string=apiUrl+"/Image/";
         this.oldImage = Data.Image.replace('http://localhost:13149/Image/', '');
              
      });
  }
 
 handleFileInput(files : FileList)
  {
    
    if (files.length === 0) {
      return;
    }
    this.fileToupload = files.item(0); 

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}

  
  
  EditCategory(data:any)
  {
    if(this.fileToupload !==null)
    {
      console.log("IFff");
      this.sendImage();
      this.category.Image=this.fileToupload.name;
     
    }
    else
    {
      console.log("Elese");
      this.category.Image=this.oldImage;
    }
    
    this.CatService.UpdateCategory(this.category,this.categoryId).subscribe(Data=>
    {
      console.log("data after subscribe"+Data);
    })
    this.dataSharingService.IsCategoryEdited.next(true)
    
    this.route.navigate(['/Category'])
     
      
  }
  sendImage(){
    console.log( "image name" + this.fileToupload);
    this.fileUploadService.postFile(this.fileToupload).subscribe(
      data=>{console.log("Data Image is " + data)},err=>{})
  }
  

}

