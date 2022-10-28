import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private route: Router,

  ) {}
  canActivate() {
    if (this.userService.IsLoggedIn()) {
      return true;
    }
    this.toast.info({
      detail: "You're not logged in",
      summary: 'Please login to continue',
    });

    this.route.navigate(['login']);
    return false;
  }
}
