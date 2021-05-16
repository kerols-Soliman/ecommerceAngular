import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct } from '../interface/Product';
import { CategroyService } from '../service/categroy.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-products-of-category',
  templateUrl: './products-of-category.component.html',
  styleUrls: ['./products-of-category.component.scss']
})
export class ProductsOfCategoryComponent implements OnInit {

  categoryId:any;
  catName:string;
  products:any;
  proID: any;
  CateID: number;
  CategoryName: string;
  constructor(private activeRoute:ActivatedRoute,private categoryService:CategroyService,
    private router:Router,private userService:UserService,private spinner:NgxSpinnerService,
    private productService:ProductService,private sharedDataService:DataSharingServiceService) 
      {
        
        this.sharedDataService.IsCategoryNavChanged.subscribe(data=>{
            this.load()
        })
       }

  ngOnInit(): void {
    this.load()
  }
  load(){
    this.spinner.show()
    this.activeRoute.params.subscribe(params=>
      {
        this.categoryId=params['id']
        this.catName=params['CatName']
        this.categoryService.getAllCategoryProducts(this.categoryId).subscribe(data=>
          {
            this.products=data;
            this.spinner.hide();
          })
      }
    );
    
  }
  cardClass = {
    "card": true,
    "border": true,
    "border-white": true,
    "card-hover": true,
    "ml-4": true,
    "mb-2": true

  }


  categroyHeaderStyle = {
    "background-color": "#e32e00",
    "width": "100%",
    "color": "white",
    "margin-bottom": "7px"
  }

  EditProduct(id)
  {
    this.router.navigate(['EditProduct',id]);
  }
  checkAdmin(role):boolean
  {
    return this.userService.RoleMatch(role);
  }
  ShowDetails(id){
    this.router.navigate(['/productDetails',id])
  }
  DeleteProduct(productId)
  {
    this.proID=productId;
    this.productService.GetById(this.proID).subscribe(Data=>
      {
        this.CateID=Data.Category_Id;
        this.categoryService.GetById(this.CateID).subscribe(cat=>
          {
           this.CategoryName=cat.Name;
          })
        
      });

  this.productService.DeleteProduct(productId).subscribe(data=>
    {
      console.log(data);
      this.router.navigate(['/CategoryProducts',this.CateID,this.CategoryName]);
      console.log("Delet Done Req");
    },
    (err:HttpErrorResponse)=>
    {
      console.log("Delete error Req");
    }
   )
    this.sharedDataService.IsProductEdited.next(true)
   
  }

}
