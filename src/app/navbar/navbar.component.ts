import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private accountService:AccountService,private userService:UserService) { }
  IsLoggin:Boolean=false;
  ngOnInit(): void {
    this.IsLogged()
  }
  IsLogged(){
    this.IsLoggin=this.accountService.isAuthenticated();
  }
  LogOut()
  {
    localStorage.removeItem('userToken');
    this.IsLogged();
    this.router.navigate(['/LogIn']);
  }

  checkAdmin(role):boolean
  {
    console.log(role);
    console.log(this.userService.RoleMatch(['Admin']));
    return this.userService.RoleMatch(role);
  }
}
