import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private accountService:AccountService) { }
  IsLoggin:Boolean=false;
  photo;
  userName
  ngOnInit(): void {
    this.IsLogged()
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
    this.IsLogged()
    this.router.navigate(['/Home']);
  }


}
