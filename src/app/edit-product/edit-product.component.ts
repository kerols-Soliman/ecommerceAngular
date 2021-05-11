import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategroyService } from '../service/categroy.service';
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
  constructor(private prodservice:ProductService,
       private CatService:CategroyService,
       private http: HttpClient,
       private fileUploadService:FileUploadServiceService) { }

  ngOnInit(): void {
    this.prodservice.GetById(1).subscribe(Data=>
      {
        this.product=Data;
      });
      this.CatService.getAllCategories().subscribe(Data=>
        {
          this.categories=Data;
        });
  }

  onSubmit(data:any)
  {
    if(this.fileToupload !=null)
    {
      this.sendImage();
      this.product.Image=this.fileToupload.name;
    }
    
   this.prodservice.UpdateProduct(this.product,1).subscribe(Data=>
      {
        this.productAfterUPdate=Data;
      });
      console.log(this.product);
  }

  handleFileInput(files : FileList)
  {
    if (files.length === 0) {
      return;
    }
    this.fileToupload = files.item(0); 
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
