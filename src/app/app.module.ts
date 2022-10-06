import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http"
import { NgToastModule } from 'ng-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeroSliderComponent } from './Components/hero-slider/hero-slider.component';
import { AdminDashboardComponent } from './Admin_dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './USER_COMPONENT/user-dashboard/user-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { EditUserComponent } from './USER_COMPONENT/edit-user/edit-user.component';
import { ReceiptComponent } from './USER_COMPONENT/receipt/receipt.component';
import { HotelListComponent } from './Components/hotel-list/hotel-list.component';
import { HotelRoomsComponent } from './Admin_dashboard/hotel-rooms/hotel-rooms.component';
import { TestingComponent } from './Components/testing/testing.component';
import { AnalyticsComponent } from './Admin_dashboard/analytics/analytics.component';
import { TestimonialComponent } from './Components/testimonial/testimonial.component';
import { AdminSideBarComponent } from './Admin_dashboard/admin-side-bar/admin-side-bar.component';
import { UserSidebarComponent } from './USER_COMPONENT/user-sidebar/user-sidebar.component';
import { AddRoomsComponent } from './Admin_dashboard/add-rooms/add-rooms.component';
import { BookedRoomsComponent } from './Admin_dashboard/booked-rooms/booked-rooms.component';
import { RegisteredUsersComponent } from './Admin_dashboard/registered-users/registered-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './AUTH/user-registration/user-registration.component';
import { RoomListComponent } from './Admin_dashboard/room-list/room-list.component';
import { UserAccountDetailsComponent } from './USER_COMPONENT/user-account-details/user-account-details.component';
import { ViewRoomComponent } from './Admin_dashboard/view-room/view-room.component';
import { ViewUserComponent } from './Components/view-user/view-user.component';
import { CartPageComponent } from './Components/cart-page/cart-page.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeroSliderComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    EditUserComponent,
    ReceiptComponent,
    HotelListComponent,
    HotelRoomsComponent,
    TestingComponent,
    AnalyticsComponent,
    TestimonialComponent,
    AdminSideBarComponent,
    UserSidebarComponent,
    AddRoomsComponent,
    BookedRoomsComponent,
    RegisteredUsersComponent,
    UserRegistrationComponent,
    RoomListComponent,
    UserAccountDetailsComponent,
    ViewRoomComponent,
    ViewUserComponent,
    CartPageComponent,
    NotFoundComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
