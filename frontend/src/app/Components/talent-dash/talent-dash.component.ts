import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiServiceService } from '../../Services/api-service.service';
import { talent, talentInfoResponse, allTalentsResponse } from '../../Interfaces/talent.inteface';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-talent-dash',
  standalone: true,
  imports: [ NavbarComponent, CommonModule],
  templateUrl: './talent-dash.component.html',
  styleUrl: './talent-dash.component.css'
})
export class TalentDashComponent {

  talents: talent [] = [];
  talent : talent={} as talent
  talentInfoResponse: talentInfoResponse; 
  errorMessage: string = '';

  constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,){
    this.talentInfoResponse = {} as talentInfoResponse;
  }

  ngOnInit(){

  }

  getSingleTalent(id: string) {
    this.apiService.getSingleTalent(id).subscribe(
        (res: talentInfoResponse) => {
            res.talent.forEach((talent) =>{
              this.talent = talent
            });
            
        },
        (error) => {
            console.error('Error fetching talent:', error);
        }
    );
  }

  getTalentJobs(id: string){

  }

  getTalentApplications(id: string){
    
  }
}
