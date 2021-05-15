import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from '../interface/Product';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-seach',
  templateUrl: './product-seach.component.html',
  styleUrls: ['./product-seach.component.scss']
})
export class ProductSeachComponent implements OnInit {

  constructor(private productService:ProductService,private activeRote:ActivatedRoute
    ,private dataSharedService:DataSharingServiceService) {
      this.dataSharedService.IsSearchInput.subscribe(data=>{
        this.refreahData(data)
      })
    }

  AllProducts:IProduct[]
  NameSearch
  ngOnInit(): void {
    this.load()
  }
  load(){
    this.activeRote.paramMap.subscribe((param:ParamMap)=>{
      this.NameSearch=param.get('name')
    })
    console.log(this.NameSearch)
    this.productService.searchByName(this.NameSearch).subscribe(data=>{
      this.AllProducts=data
    })
  }
  refreahData(name){
    
    this.productService.searchByName(name).subscribe(data=>{
      this.AllProducts=data
    })
  }

}
