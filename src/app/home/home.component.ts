import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ICategroy } from '../interface/Categroy';
import { IProduct } from '../interface/Product';
import { CategroyService } from '../service/categroy.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categroyies: ICategroy[];
  Products: IProduct[];
  catErr: string;
  proErr: string;
  flag: number = 1;
  prevCatID : number ;


  constructor(private categroyService: CategroyService, private productService: ProductService , private router : Router) { }



  ngOnInit(): void {

    this.categroyService.getAllCategories().subscribe(
      (data) => {
        this.categroyies = data;
        console.log(data);
      },
      (err) => {
        this.catErr = err;
        console.log(err);
      }
    );

    this.productService.getProducts().subscribe(
      (data) => {
        this.Products = data;
        console.log(data);
      },
      (err) => {
        this.proErr = err;
        console.log(err);
      }

    )
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



  FilterProduct(cat: ICategroy, prod: IProduct) {
    // console.log(cat.Id);
    //console.log(prod.Category_Id)
    // if (cat.Id == prod.Category_Id) {

    //   if (this.flag <= 4) {
    //     this.flag++;
    //     console.log("true" + this.flag)
    //     return true;

    //   } else {
    //     this.flag = 1;
    //     console.log("false" + this.flag)
    //     return false;
    //   }

    // } else {

    //   return false;
    // }
   return cat.Id == prod.Category_Id ;
    
    

  }
  onProductClick(prodct : IProduct){
    
    this.router.navigate(["/productDetails" , prodct.Id])
    console.log("pushed")
  }

}
