import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { talent, allTalentsResponse, talentInfoResponse } from '../../Interfaces/talent.inteface';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NgbAccordionModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {

  talents: talent[] = [];

  constructor(private apiservice: ApiServiceService, private router: Router) {
    this.displayTalents();
  }

  displayTalents(){
    this.apiservice.getAllTalents().subscribe((res)=>{
      if(res.talents){
        res.talents.forEach((talent)=>{
          this.talents.push(talent);
        })
      }
    })
  }

}
