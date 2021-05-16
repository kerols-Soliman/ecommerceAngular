import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders:any;
  isEmprty:boolean=false;
  constructor(private orderService:OrderService,private dataSharedService:DataSharingServiceService) { 
    this.dataSharedService.IsOrderChanged.subscribe(data=>{
      this.load();
    })
  }

  ngOnInit(): void {   
    this.load()
  }
  load(){
    this.orderService.GetOrders().subscribe((data)=>
    {
      this.orders=data;
      this.orders=this.orders.reverse();
      if(this.orders.length===0)
      {
        this.isEmprty=true;
      }
    },(err:HttpErrorResponse)=>
    {
      console.log("error Req");
    }
    );
  }

}
