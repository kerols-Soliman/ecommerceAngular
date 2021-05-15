import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private userService:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean
    {
      if(localStorage.getItem('userToken')!=null)
        {
          let roles=route.data["roles"] as Array<string>;
          if(roles)
          {
            console.log(roles);
            var match=this.userService.RoleMatch(roles);
            if(match) return true;
            else
            {
              this.router.navigate(['/login']);
              return false;
            }
          }
          else
          {
            return true;
          }
        }
     this.router.navigate(['/LogIn']);
     return false;

    }
  
}
