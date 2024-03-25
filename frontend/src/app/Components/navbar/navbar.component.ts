import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterOutlet,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(private router: Router){}

  isLogged: boolean = false;
  token = this.getToken()

  getToken(){
    if(typeof window !== 'undefined'){
      return localStorage?.getItem('token') as string
    }else{
      return null
    }
  }


  isTokenAvailable(): boolean {
    try {
        if (typeof window !== 'undefined') {
            const token = localStorage?.getItem('token');
            return !!token;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return false;
    }
  }


  // navigateToDashBoard() {
  //   const token = localStorage?.getItem('token');
  //   if (!token) {
  //     this.router.navigate(['login']);
  //     return;
  //   }
  
  //   // this.authService.readToken(token).subscribe(
  //   //   (res) => {
  //   //     console.log(res.info);
  //   //     const userType = res.info.UserType;
  //   //     if (userType === 'Talent') {
  //   //       this.router.navigate(['/talent-dashboard']);
  //   //     } else if (userType === 'Employer') {
  //   //       this.router.navigate(['/employer-dashboard']);
  //   //     } else {
  //   //       // Handle other user types or scenarios
  //   //     }
  //   //   },
  //   //   (error) => {
  //   //     console.error('Error retrieving user details:', error);
  //   //     // Handle error if necessary
  //   //   }
  //   // );
  // }

  logout(){
    if(typeof window !== 'undefined'){
      localStorage?.clear();
      this.router.navigate(['login'])
    } 
  }
}
