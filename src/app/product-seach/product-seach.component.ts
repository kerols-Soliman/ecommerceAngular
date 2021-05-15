import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from '../interface/Product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-seach',
  templateUrl: './product-seach.component.html',
  styleUrls: ['./product-seach.component.scss']
})
export class ProductSeachComponent implements OnInit {

  constructor(private productService:ProductService,private activeRote:ActivatedRoute) { }

  AllProducts:IProduct[]
  NameSearch
  ngOnInit(): void {
    this.activeRote.paramMap.subscribe((param:ParamMap)=>{
      this.NameSearch=param.get('name')
    })
    this.productService.searchByName(this.NameSearch).subscribe(data=>{
      this.AllProducts=data
      console.log(data)
    })
  }

}
