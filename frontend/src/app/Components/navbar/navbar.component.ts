import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
import { AuthServiceService } from '../../Services/auth-service.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(private router: Router, private authService: AuthServiceService){}

  isLogged: boolean = false;

  getToken(){
    let token = localStorage.getItem('token',) as string;
    if(token){
      return token
    } else {
      return null
    }
  }

  isTokenAvailable(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  navigateToDashBoard() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return;
    }
  
    // this.authService.readToken(token).subscribe(
    //   (res) => {
    //     console.log(res.info);
    //     const userType = res.info.UserType;
    //     if (userType === 'Talent') {
    //       this.router.navigate(['/talent-dashboard']);
    //     } else if (userType === 'Employer') {
    //       this.router.navigate(['/employer-dashboard']);
    //     } else {
    //       // Handle other user types or scenarios
    //     }
    //   },
    //   (error) => {
    //     console.error('Error retrieving user details:', error);
    //     // Handle error if necessary
    //   }
    // );
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
