import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService, NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { CategroyService } from '../service/categroy.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { FileUploadServiceService } from '../service/file-upload-service.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product:any;
  productAfterUPdate:any;
  categories:any;
  fileToupload:any=null;
  selectedFile:any;
  imageSrc: string;
  imagePath:any;
  imgURL: any;
  ProductId:number;
  oldImage:any;
  CategoryID:number;
  CategoryName:string;
  constructor(private prodservice:ProductService,
       private CatService:CategroyService,
       private http: HttpClient,
       private fileUploadService:FileUploadServiceService,
       private spinner:NgxSpinnerService,
      private route:Router,private activeRoute:ActivatedRoute,private dataSharingService:DataSharingServiceService)
        {
          this.activeRoute.params.subscribe(params=>
            this.ProductId=params['id']
            );
         }

  ngOnInit(): void {
    // this.spinner.show();
    this.prodservice.GetById(this.ProductId).subscribe(Data=>
      {
        this.product=Data;
        this.oldImage = Data.Image.replace('http://localhost:13149/Image/', '');
      });
      this.CatService.getAllCategories().subscribe(Data=>
        {
          this.categories=Data;
        });
       
  }

  onSubmit(data:any)
  {
    if(this.fileToupload !==null)
    {
      this.sendImage();
      this.product.Image=this.fileToupload.name;
    }
    else
    {
      this.product.Image=this.oldImage;
    }
    
   this.prodservice.UpdateProduct(this.product,this.ProductId).subscribe(Data=>
      {
        this.productAfterUPdate=Data;
      });
     
      this.prodservice.GetById(this.ProductId).subscribe(Data=>
        {
          this.CategoryID=Data.Category_Id;
          this.CatService.GetById(this.CategoryID).subscribe(cat=>
            {
             this.CategoryName=cat.Name;
             this.route.navigate(['/CategoryProducts',this.CategoryID,this.CategoryName])
            })
          
        });
        this.dataSharingService.IsProductEdited.next(true)
      
      
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

  sendImage(){
    console.log( "image name" + this.fileToupload)
   this.fileUploadService.postFile(this.fileToupload).subscribe(

     data=>{
       console.log("Data Image is " + data)
           },
        err=>{
             }
          )
   }
}
