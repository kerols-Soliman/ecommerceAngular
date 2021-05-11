import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interface/Product';
import { ProductService } from '../service/product.service';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService:ProductService,private spinner:NgxSpinnerService) { }

  product:IProduct;
  
  availableQuantity:boolean=true;
  ngOnInit(): void {
    this.spinner.show()
    this.productService.GetById(1).subscribe(data=>{
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
  

  

}
