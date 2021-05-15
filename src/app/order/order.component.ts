import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders:any;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {   
    this.orderService.GetOrders().subscribe((data)=>
    {
      
      console.log("data");
      console.log(data);
      this.orders=data;
      this.orders=this.orders.reverse();
    },(err:HttpErrorResponse)=>
    {
      console.log("error Req");
    }
    );
  }

}
