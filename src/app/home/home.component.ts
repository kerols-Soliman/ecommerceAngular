import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { ICategroy, ICategroyOfProduct } from '../interface/Categroy';
import { IProduct } from '../interface/Product';
import { CategroyService } from '../service/categroy.service';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

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
  
  


  constructor(private categroyService: CategroyService, private productService: ProductService ,
    private spinner:NgxSpinnerService, private router : Router,private userService:UserService) { }



  ngOnInit(): void {
    this.spinner.show();
    this.categroyService.getAllCategories().subscribe(
      (data) => {
        this.categroyies = data;
        this.load()
        this.spinner.hide()
      },
      (err) => {
        this.catErr = err;
        console.log(err);
      }
    );
  }

  newCategory=new Array()
  load(){
    this.categroyies.forEach(element => {
      this.productInCategory(element.Id)
    });
  }
  productInCategory(catID){
    this.categroyService.GetById(catID).subscribe(data=>{
      data.Products=data.Products.slice(0,4)
      this.newCategory.push(data)
      console.log(this.newCategory)
    })
  }
  ShowDetails(id){
    this.router.navigate(['/productDetails',id])
  }
  showMore(category){

    this.router.navigate(['/CategoryProducts',category.Id , category.Name])
  }
  EditProduct(id)
  {
    this.router.navigate(['EditProduct',id]);
  }
  checkAdmin(role):boolean
  {
    return this.userService.RoleMatch(role);
  }
  
}
