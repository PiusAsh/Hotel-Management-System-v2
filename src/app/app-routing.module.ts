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

const routes: Routes = [
  {
    path: 'register', component: UserRegistrationComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'room-list', component: RoomListComponent
  },
  {
    path: 'admin', component: AdminDashboardComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'edit', component: EditUserComponent
  },
  {
    path: 'receipt', component: ReceiptComponent
  },
  {
    path: 'rooms', component: HotelRoomsComponent
  },
  {
    path: 'reg-users', component: RegisteredUsersComponent
  },
  {
    path: 'bookings', component: BookedRoomsComponent
  },
  
  {
    path: 'add', component: AddRoomsComponent
  },
  {
    path: 'testing', component: TestingComponent
  },
  {
    path: 'sidebar', component: AdminSideBarComponent
  },
  {
    path: 'test', component: TestimonialComponent
  },
  {
    path: 'analytics', component: AnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
