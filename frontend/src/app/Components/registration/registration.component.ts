import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployerRegistrationComponent } from '../employer-registration/employer-registration.component';
import { TalentRegistrationComponent } from '../talent-registration/talent-registration.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [EmployerRegistrationComponent, TalentRegistrationComponent, CommonModule, RouterOutlet,  NavbarComponent, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {

  constructor(private router: Router) {}

  navigateToTalentRegistration() {
    this.router.navigate(['/talent-registration']);
  }
  
  navigateToEmployerRegistration(){
    this.router.navigate(['/employer-registration']);
  }
}
