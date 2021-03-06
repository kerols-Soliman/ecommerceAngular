import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../interface/Product';
import { CartService } from '../service/cart.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { FaviorateService } from '../service/faviorate.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService,private route:Router,private orderService:OrderService,
    private dataSharedService:DataSharingServiceService , private favouriteService : FaviorateService ) {
      this.dataSharedService.IsCartChanged.subscribe(data=>{
        this.isEmprty=false
        this.loadData()
      })
    }

  products:IProduct[];
  totalPrice:number=0;
  isEmprty:boolean=false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.totalPrice=0;
    this.cartService.getproductInCart().subscribe(data=>{
      this.products=data['Productss']
      this.products.forEach(p => {
        this.totalPrice+=p.Quentity*p.Price;
      });
      if(this.products.length===0)
      {
        console.log("empty");
        this.isEmprty=true;
      }
    })
  }
  delete(pro_Id:number){
    this.products=null;
    this.cartService.deleteFromCart(pro_Id).subscribe(data=>this.loadData())
    
  }

  saveProduct(product){

    this.favouriteService.AddProductToFaviorates(product.Id).subscribe(

      data=> console.log(data)
    )
    
    
  }

  changeQty(product:IProduct,qty){
    product.Quentity=qty;
    this.cartService.edit(product.Id,product).subscribe(data=>this.loadData())
    
  }

  Increase(input,product:IProduct){
    input.value++;
    this.changeQty(product,input.value)    
  }
  Decrease(input,product:IProduct){
    if(input.value>1){
      input.value--;
      this.changeQty(product,input.value) 
    }
  }

  MakeOrder()
  {
    this.orderService.PostOrder().subscribe((data)=>
      { 
        this.route.navigate(['/MyOrders']);
        this.dataSharedService.IsOrderChanged.next(true);
      },(err:HttpErrorResponse)=>
      {
        console.log("error Req");
      }
    
    )
     
  }
  AddTofaviorate(id:number)
  {
    this.favouriteService.AddProductToFaviorates(id).subscribe(data=>
      {
        this.route.navigate(['FaviorateProducts']);
      },(err:HttpErrorResponse)=>
      {
        console.log("error Req");
      }
    )
  }

}
