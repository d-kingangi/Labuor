import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TalentRegistrationComponent } from './Components/talent-registration/talent-registration.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { TalentsComponent } from './Components/talents/talents.component';
import { TalentProfileComponent } from './Components/talent-profile/talent-profile.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, TalentRegistrationComponent, NavbarComponent, LandingComponent, LoginComponent, TalentsComponent, TalentProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Labour';
}
