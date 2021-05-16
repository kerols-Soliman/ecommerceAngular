import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { DataSharingServiceService } from '../service/data-sharing-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private sharedDataService:DataSharingServiceService,private accountService:AccountService,
    private router:Router) {
    this.sharedDataService.IsUserLogIn.subscribe(data=>{
      this.IsLoggin=data
    })
   }
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
    localStorage.removeItem('userRoles');
    this.IsLogged();
    this.router.navigate(['/']);
    this.sharedDataService.IsUserLogIn.next(false)
  }

}
