import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiServiceService } from '../../Services/api-service.service';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { talent, talentInfoResponse, allTalentsResponse } from '../../Interfaces/talent.inteface';
import { review, allReviewsResponse, reviewInfoResponse } from '../../Interfaces/review.interface';
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
  reviews: review [] = [];
  review: review={} as review
  similarTalents: talent[] = [];
  talentInfoResponse: talentInfoResponse; 
  reviewInfoResponse: reviewInfoResponse;
  errorMessage: string = '';

    /**
   * Constructor for initializing ApiServiceService and Router.
   *
   * @param {ApiServiceService} apiService - the ApiServiceService instance
   * @param {Router} router - the Router instance
   */

  constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,){
    this.talentInfoResponse = {} as talentInfoResponse;
    this.reviewInfoResponse = {} as reviewInfoResponse;
  }

    ngOnInit(){
      const talentId = this.route.snapshot.paramMap.get('talentId');
      if (talentId) {
        this.getSingleTalent(talentId);
        this.fetchTalentsByIndustry(this.talent?.industryId);
        this.getTalentReviews(talentId);
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

    getTalentReviews (talentId: string){
      this.apiService.getTalentReviews(talentId).subscribe(
        (res: allReviewsResponse) => {
          if (res && Array.isArray(res.reviews)) {
            this.reviews = res.reviews;
          } else {
            console.error('Unexpected response structure:', res);
          }
        },
        (error) => {
          console.error('Error fetching reviews:', error);
        }
      )
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
