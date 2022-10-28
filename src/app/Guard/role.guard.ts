import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  admin: any;
  constructor(
    private toast: NgToastService,
    private userService: UserService,
    private route: Router
  ) {}
  canActivate() {
    if (this.userService.IsAdmin() ) {
      return true;
    }
    this.toast.info({
      detail: 'Unauthorized',
      summary: "You don't have access to the page",
      duration: 5000,
    });
    this.route.navigate(['login']);
    return false;
  }
}
