import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!!JSON.parse(localStorage.getItem("user") as string)){
      if(["/login", "/register"].includes(state.url)){
        this.router.navigateByUrl("/main");
        return false;
      }
    }
    return true;
    //test@gmail.com
  }
}
