import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interface/Product';
import { ProductService } from '../service/product.service';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { FaviorateService } from '../service/faviorate.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService:ProductService,private spinner:NgxSpinnerService
    ,private activateRoute:ActivatedRoute,private cartService:CartService,private router:Router
    ,private faviorateService:FaviorateService) { }

  product:IProduct;
  Id:number;
  availableQuantity:boolean=true;
  ngOnInit(): void {
    this.spinner.show()
    this.activateRoute.paramMap.subscribe((param:ParamMap)=>{
      this.Id=parseInt(param.get('id'))
    })
    this.productService.GetById(this.Id).subscribe(data=>{
      this.product=data;
      this.spinner.hide();
    })
  }
  Quantity:number=1;
  Increase(){
    if(this.Quantity<=this.product.Quentity){
      this.Quantity++;
      this.availableQuantity=true
    }else{
      this.availableQuantity=false
    }
  }
  Decrease(){
    if(this.Quantity>1)
      this.Quantity--;
      this.availableQuantity=true
  }
  
  addToCart(){
    this.cartService.post(this.product.Id,this.Quantity).subscribe(data=>console.log(data))
  }
  AddTofaviorate(id:number)
  {
    this.faviorateService.AddProductToFaviorates(id).subscribe(data=>
      {
        this.router.navigate(['FaviorateProducts']);
      },(err:HttpErrorResponse)=>
      {
        console.log("error Req");
      }
    )
  }

}
