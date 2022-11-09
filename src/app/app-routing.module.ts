import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Admin_dashboard/admin-dashboard/admin-dashboard.component';
import { AdminSideBarComponent } from './Admin_dashboard/admin-side-bar/admin-side-bar.component';
import { AnalyticsComponent } from './Admin_dashboard/analytics/analytics.component';
import { EditUserComponent } from './USER_COMPONENT/edit-user/edit-user.component';
import { HomeComponent } from './Components/home/home.component';
import { HotelRoomsComponent } from './Admin_dashboard/hotel-rooms/hotel-rooms.component';
import { LoginComponent } from './login/login.component';
import { ReceiptComponent } from './USER_COMPONENT/receipt/receipt.component';
import { RegisterComponent } from './register/register.component';
import { TestimonialComponent } from './Components/testimonial/testimonial.component';
import { TestingComponent } from './Components/testing/testing.component';
import { AddRoomsComponent } from './Admin_dashboard/add-rooms/add-rooms.component';
import { RegisteredUsersComponent } from './Admin_dashboard/registered-users/registered-users.component';
import { BookedRoomsComponent } from './Admin_dashboard/booked-rooms/booked-rooms.component';
import { UserRegistrationComponent } from './AUTH/user-registration/user-registration.component';
import { RoomListComponent } from './Admin_dashboard/room-list/room-list.component';
import { UserDashboardComponent } from './USER_COMPONENT/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './USER_COMPONENT/user-sidebar/user-sidebar.component';
import { UserAccountDetailsComponent } from './USER_COMPONENT/user-account-details/user-account-details.component';
import { HotelListComponent } from './Components/hotel-list/hotel-list.component';
import { ViewRoomComponent } from './Admin_dashboard/view-room/view-room.component';
import { ViewUserComponent } from './Components/view-user/view-user.component';
import { CartPageComponent } from './Components/cart-page/cart-page.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AuthGuard } from './Guard/auth.guard';
import { RoleGuard } from './Guard/role.guard';

const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  // { path: '404', component: NotFoundComponent },
  //   { path: '**', redirectTo: '404' },
  {
    path: 'nav',
    component: NavbarComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'room-list',
    component: RoomListComponent,
  },
  {
    path: 'admin/:id',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
  },
  // {
  //   path: 'me',
  //   component: AdminDashboardComponent,
  // },
  {
    path: '',
    component: HomeComponent,
  },
  //   { path: '404', component: NotFoundComponent },
  // { path: '**', component: NotFoundComponent },
  // {
  //   path: 'edit',
  //   component: EditUserComponent,
  // },
  {
    path: 'receipt',
    component: ReceiptComponent,
  },
  {
    path: 'rooms',
    component: HotelRoomsComponent,
  },
  {
    path: 'room',
    component: HotelListComponent,
  },
  {
    path: 'reg-users',
    component: RegisteredUsersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'bookings',
    component: BookedRoomsComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'view-user/:id',
    component: ViewUserComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'room/:id',
    component: ViewRoomComponent,
  },

  {
    path: 'add',
    component: AddRoomsComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'testing',
    component: TestingComponent,
  },
  {
    path: 'sidebar',
    component: AdminSideBarComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'account-details',
    component: UserAccountDetailsComponent,
  },
  {
    path: 'testtt',
    component: TestimonialComponent,
  },
  {
    path: 'user/:id',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-bar',
    component: UserSidebarComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    // canActivate: [RoleGuard],
  },
  {
    path: 'cart-page',
    component: CartPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'test',
    component: EditUserComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
