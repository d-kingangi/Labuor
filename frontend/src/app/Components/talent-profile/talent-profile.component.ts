import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiServiceService } from '../../Services/api-service.service';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { talent, talentInfoResponse, allTalentsResponse } from '../../Interfaces/talent.inteface';

@Component({
  selector: 'app-talent-profile',
  standalone: true,
  imports: [ NavbarComponent, CommonModule],
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css'
})

export class TalentProfileComponent {

  talents: talent [] = [];
  talent : talent={} as talent
  similarTalents: talent[] = [];
  talentInfoResponse: talentInfoResponse; 
  errorMessage: string = '';

    /**
   * Constructor for initializing ApiServiceService and Router.
   *
   * @param {ApiServiceService} apiService - the ApiServiceService instance
   * @param {Router} router - the Router instance
   */

  constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,){
    this.talentInfoResponse = {} as talentInfoResponse;
  }

    ngOnInit(){
      const talentId = this.route.snapshot.paramMap.get('talentId');
      if (talentId) {
        this.getSingleTalent(talentId);
        // this.fetchTalentsByIndustry(this.talent?.industryId);
      } else {
        console.error('Talent ID not provided');
      }
    }  



     /**
   * Get a single talent information by ID.
   *
   * @param {string} id - The ID of the talent.
   * @return {void} No return value.
   */

    getSingleTalent(id: string) {
      this.apiService.getSingleTalent(id).subscribe(
          (res: talent) => {
              console.log('Res:',res);
              this.talent = res; 
              console.log('Talent here we go:', this.talent.industryId); 
              
              if (res) {
                 
                // console.log('Talent details:', );
                
              } else {
                  console.error('Talent not found or an error occurred:', res);
              }
          },
          (error) => {
              console.error('Error fetching talent:', error);
          }
      );
    }

    /**
   * Fetch talents by industry ID and store similar talents based on the response.
   *
   * @param {string} industryId - The ID of the industry to fetch talents for.
   */

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


  navigateToSingleTalent(talentId: string) {
    console.log('Talent ID:', talentId);

    this.apiService.getSingleTalent(talentId).subscribe(
        (res: talent) => {
            console.log('Response:', res);

            if (res) {
                this.talent = res;
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
