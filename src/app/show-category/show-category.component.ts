import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { NgxSpinner, NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ICategroy } from '../interface/Categroy';
import { CategroyService } from '../service/categroy.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss']
})
export class ShowCategoryComponent implements OnInit {

  constructor(private categoryService:CategroyService,private route:Router
    ,private spinner:NgxSpinnerService,private userService:UserService,
    private dataSharingService:DataSharingServiceService) 
    {
      this.dataSharingService.IsCategoryEdited.subscribe(value=>{
        if(value==true){
          this.load();
        }
      })
     }

  AllCategory:ICategroy[];
  ngOnInit(): void {
    // this.load()
  }
  ngAfterViewInit(): void {
    this.load()
  }
  load(){
    
    this.spinner.show()
    this.categoryService.getAllCategories().subscribe(data=>{
      console.log("*********** Load Data *************")
      this.AllCategory=data;
      this.spinner.hide()
    })
  }

  remove(id:number){
    this.categoryService.DeleteCategory(id).subscribe(data=>{
      this.load()
      
    });
    
    // .then(() => {
    //   window.location.reload();
    // });
  }

  EditCategory(id:number)
  {
      this.route.navigate(['EditCategory',id]);
  }
  ShowCategoryProduct(id:number,CatName:string)
  {
    this.route.navigate(['CategoryProducts',id,CatName]);
  }
  checkAdmin(role):boolean
  {
      return this.userService.RoleMatch(role);
  }

}
