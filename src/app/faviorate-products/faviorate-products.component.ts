import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../interface/Product';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { FaviorateService } from '../service/faviorate.service';

@Component({
  selector: 'app-faviorate-products',
  templateUrl: './faviorate-products.component.html',
  styleUrls: ['./faviorate-products.component.scss']
})
export class FaviorateProductsComponent implements OnInit {

  products:IProduct[];
  isEmprty:boolean=false;
  constructor(private faviorateService:FaviorateService,private router:Router
    ,private sharedDataService:DataSharingServiceService) { 
      this.sharedDataService.IsFavorietChange.subscribe(data=>{
        this.load()
        this.isEmprty=false;
      })
    }

  ngOnInit(): void {
    this.load()
  }
  load(){
    this.faviorateService.getAllFaviorateProducts().subscribe(data=>
      {
        console.log(data);
        this.products=data['Productss'];
        if(this.products.length===0)
        {
          console.log("empty");
          this.isEmprty=true;
        }

      })
  }
  remove(id:number){
    this.faviorateService.deleteProductFromFaviorates(id).subscribe(data=>
      {
        console.log(data);
        this.router.navigate(["/FaviorateProducts"]);
        this.load();
        console.log("Done Req");
      },
      (err:HttpErrorResponse)=>
      {
        console.log("error Req");
      }
     
    );
  
    }
    ShowDetails(id){
      this.router.navigate(['/productDetails',id])
    }
}
