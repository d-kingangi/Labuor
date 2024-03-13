import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TalentRegistrationComponent } from './Components/talent-registration/talent-registration.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, TalentRegistrationComponent, NavbarComponent, LandingComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Labour';
}
