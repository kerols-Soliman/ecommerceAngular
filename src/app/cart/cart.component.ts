import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interface/Product';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService) { }

  products:IProduct[];
  ngOnInit(): void {
    this.cartService.getproductInCart().subscribe(data=>{
      this.products=data
      console.log("data is :"+data)
    })
  }

  delete(pro_Id:number){
    this.cartService.deleteFromCart(pro_Id)
  }

}
