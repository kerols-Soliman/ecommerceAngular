import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategroy } from '../interface/Categroy';
import { AccountService } from '../service/account.service';
import { CategroyService } from '../service/categroy.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private accountService:AccountService
    ,private userService:UserService,private sharedDataService:DataSharingServiceService,
      private categoryService:CategroyService) {
      this.sharedDataService.IsUserLogIn.subscribe(data=>{
        this.IsLoggin=data
        this.loadData()
      })
    }
  IsLoggin:Boolean=false;
  photo;
  userName;
  AllCategory:ICategroy[]
  ngOnInit(): void {
    this.IsLogged()
    this.loadData()
  }
  loadData(){
    this.categoryService.getAllCategories().subscribe(data=>{
      this.AllCategory=data
      console.log(data)
    })
    this.accountService.GetUser().subscribe(data=>{
      this.photo=data.Image
      this.userName=data.Name
    })
  }

  IsLogged(){
    this.IsLoggin=this.accountService.isAuthenticated();
  }

  LogOut()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRoles');
    this.IsLogged();
    this.router.navigate(['/']);
    this.sharedDataService.IsUserLogIn.next(false)
  }

  checkAdmin(role):boolean
  {
    return this.userService.RoleMatch(role);
  }
  showCategory(id,name){
    this.router.navigate(['/CategoryProducts',id,name])
    this.sharedDataService.IsCategoryNavChanged.next(true)
  }
}
