import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiServiceService } from '../../Services/api-service.service';
import { talent, allTalentsResponse, talentInfoResponse } from '../../Interfaces/talent.inteface';

@Component({
  selector: 'app-talents',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './talents.component.html',
  styleUrl: './talents.component.css'
})

export class TalentsComponent {

  talents: talent [] = [];
  talent: talent | null = null; 
  talentInfoResponse = {} as talentInfoResponse
  talentsByIndustry: { industryId: string; talents: talent[] }[] = [];
  isLoading = false;
  error = '';

  constructor(private apiService: ApiServiceService, private router: Router){
    this.displayAllTalents();
  }


    /**
   * Display all talents and handle the API response
   */
  displayAllTalents(): void {
    this.isLoading = true;
    this.error = '';
    this.talentsByIndustry = [];

    this.apiService.getAllTalents().subscribe(
      (res: { talents: talent[] }) => {
        
        if (res && Array.isArray(res.talents)) {
          res.talents.forEach((talent: talent) => {
            const industryIndex = this.talentsByIndustry.findIndex(
              (industry) => industry.industryId === talent.industryId
            );

            if (industryIndex !== -1) {
              this.talentsByIndustry[industryIndex].talents.push(talent);
            } else {
              this.talentsByIndustry.push({
                industryId: talent.industryId,
                talents: [talent],
              });
            }
          });
        } else {
          console.error('Unexpected response structure:', res);
          this.error = 'Unexpected response structure. Please try again later.';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching talents:', error);
        this.error = 'Failed to fetch talents. Please try again later.';
        this.isLoading = false;
      }
    );
  }


    /**
   * Navigates to a single talent based on the provided talent ID.
   *
   * @param {string} talentId - the ID of the talent to navigate to
   * @return {void} 
   */
  navigateToSingleTalent(talentId: string) {
    console.log('Talent ID:', talentId);

    this.apiService.getSingleTalent(talentId).subscribe(
        (res: talentInfoResponse) => {
            console.log('Response:', res);

            if (res) {
              res.talent.forEach((talent)=>{this.talent = talent})
                // this.talent = res.talent;
                console.log('Talent:', this.talentInfoResponse);  
                this.router.navigate(['/talent-profile', talentId]);
            } else {
              console.error('Talent not found or an error occurred:', res);
            }
        },
        (error) => {
            console.error('Error fetching talent:', error);
        }
    );
  }
}
