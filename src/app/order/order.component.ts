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
      this.orders=data;
      this.orders=this.orders.reverse();
      console.log(data);
    },(err:HttpErrorResponse)=>
    {
      console.log("error Req");
    }
    );
  }

}
