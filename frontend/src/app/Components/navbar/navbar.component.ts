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

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
