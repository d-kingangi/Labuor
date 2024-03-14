import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiServiceService } from '../../Services/api-service.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { talent, talentInfoResponse, allTalentsResponse } from '../../Interfaces/talent.inteface';

@Component({
  selector: 'app-talent-profile',
  standalone: true,
  imports: [ NavbarComponent, CommonModule],
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css'
})
export class TalentProfileComponent {

  similarTalents: talent[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiServiceService, private router: Router){
  }

  getSingleTalent(id: string) {
    this.apiService.getSingleTalent(id).subscribe(
        (res: talentInfoResponse) => {
            console.log(res);

            if (res) {
                console.log('Talent details:', res);
            } else {
                console.error('Talent not found or an error occurred:', res);
            }
        },
        (error) => {
            console.error('Error fetching talent:', error);
        }
    );
  }

  fetchTalentsByIndustry(industryId: string) {
    console.log('Fetching talents by industry:', industryId);
    this.apiService.getTalentsByIndustry(industryId).subscribe(
      (res: allTalentsResponse) => {
        console.log('Response:', res);

        if (res && Array.isArray(res.talents)) {
          this.similarTalents = res.talents.slice(0, 6);
          console.log('Similar Talents:', this.similarTalents);
        } else {
          this.errorMessage = 'Unexpected response structure.';
          console.error('Unexpected response structure:', res);
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching similar talents. Please try again.';
        console.error('Error fetching talents:', error);
      }
    );
  }

}
