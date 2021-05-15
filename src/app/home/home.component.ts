import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ICategroy, ICategroyOfProduct } from '../interface/Categroy';
import { IProduct } from '../interface/Product';
import { CategroyService } from '../service/categroy.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private categroyService: CategroyService, private productService: ProductService , private router : Router) { }



  ngOnInit(): void {

    
  }

  

}
