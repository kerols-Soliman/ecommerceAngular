import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from '../interface/Product';
import { CategroyService } from '../service/categroy.service';
import { FileUploadServiceService } from '../service/file-upload-service.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private productService: ProductService 
    , private categroyService : CategroyService  ,
     private fileUploadService: FileUploadServiceService ,private router : Router   ) { }


  catgoryies = [];
  responseId: number
  errMsg: string
  catErrMsg : string
  product: IProduct
  FileToUpload: File = null;
  photo="/assets/Image/upload.png"

  CreateProductForm = this.fb.group({
    productName: ["", [Validators.required, Validators.minLength(4)]],
    productPrice: ["", [Validators.required]],
    productQuentity: ["", [Validators.required]],
    productDescription: ["", [Validators.required, Validators.minLength(10)]],
    productImage: ["", [Validators.required]],
    productDiscount: [""],
    categroy: [""]
  })

  get productName() {
    return this.CreateProductForm.get("productName")
  }
  get productPrice() {
    return this.CreateProductForm.get("productPrice");
  }
  get productQuentity() {
    return this.CreateProductForm.get("productQuentity");
  }
  get productDescription() {
    return this.CreateProductForm.get("productDescription");
  }
  get productImage() {
    return this.CreateProductForm.get("productImage");
  }
  get productDiscount() {
    return this.CreateProductForm.get("productDiscount");
  }
  get categroy() {
    return this.CreateProductForm.get("categroy");
  }

  ngOnInit(): void {
    this.categroyService.getAllCategories().subscribe(
      
       data=>{
         this.catgoryies = data
       },
       err=>{
         this.catErrMsg =  err  
       }
    )
  }

  addNewProduct() {
    //  this.onUpload();
   this.sendImage();

     this.product = {
      "Name": this.productName.value,
      "Price": this.productPrice.value,
      "Quentity": this.productQuentity.value,
      "Description": this.productDescription.value,
      "Image": this.FileToUpload.name,
      "Discount": this.productDiscount.value,
      "Category_Id": this.categroy.value
    }
    
    this.productService.postProduct(this.product).subscribe(
      response => {
        this.responseId = response.Id;
      },
      err => {
        this.errMsg = err
      }

    );
    console.log(this.errMsg);

    this.router.navigate(['Category'])
  }

  handleFileInput(file:FileList){
    this.FileToUpload=file.item(0);

    var reader = new FileReader();  
    reader.onload = (event: any) => {  
        this.photo = event.target.result;  
    }  
    reader.readAsDataURL(this.FileToUpload);  
  }

  sendImage(){
    console.log( "image name" + this.FileToUpload)
   this.fileUploadService.postFile(this.FileToUpload).subscribe(

     data=>{
      
      console.log("Data Image is " + data)
     },

     err=>{
    
     }
   )
   }
  }
