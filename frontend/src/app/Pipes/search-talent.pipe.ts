import { Pipe, PipeTransform } from '@angular/core';
import { talent, allTalentsResponse } from '../Interfaces/talent.inteface'

@Pipe({
  name: 'searchTalent',
  standalone: true
})

export class SearchTalentPipe implements PipeTransform {

    transform(talents: allTalentsResponse[], firstname: string): allTalentsResponse[] {
      if (!firstname || firstname.trim() === '') {
        return talents;
      }
    
      const filteredTalents: allTalentsResponse[] = []

      for(let talent of talents){
        if(talent.talents[0].firstname.toLowerCase().includes(firstname.toLowerCase())){
          filteredTalents.push(talent)
        }
      }
  
      return filteredTalents;
    }
  }
