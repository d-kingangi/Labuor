import { Pipe, PipeTransform } from '@angular/core';
import { employer, allEmployersResponse } from '../Interfaces/employer.interface'

@Pipe({
  name: 'searchEmployer',
  standalone: true
})

export class SearchEmployerPipe implements PipeTransform {

  transform(employers: allEmployersResponse, orgname: string[]): allEmployersResponse[] {
    return employers;
  }

  const filtered: allEmployersResponse[] = []

  for(let employer of allEmployersResponse){
    if(employer.orgname.toLowerCase().includes(orgname.toLowerCase())){
      this.filtered.push(employer)
    }
  }

  return filtered

}
