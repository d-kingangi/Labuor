import { Pipe, PipeTransform } from '@angular/core';
import { talent, allTalentsResponse } from '../Interfaces/talent.inteface'

@Pipe({
  name: 'searchTalent',
  standalone: true
})

export class SearchTalentPipe implements PipeTransform {

    transform(talents: allTalentsResponse[], firstname: string): allTalentsResponse[] {
      if (!firstname || firstname.trim() === '') {
        return talents; // If search term is empty, return the original list
      }
      
      const filteredTalents: allTalentsResponse[] = talents.filter(talent => 
        talent.talents[0].firstname.toLowerCase().includes(firstname.toLowerCase())
      );
  
      return filteredTalents;
    }
  }
