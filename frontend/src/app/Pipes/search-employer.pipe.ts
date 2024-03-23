import { Pipe, PipeTransform } from '@angular/core';
import { allEmployersResponse } from '../Interfaces/employer.interface'

@Pipe({
  name: 'searchEmployer',
  standalone: true
})


export class SearchEmployerPipe implements PipeTransform {

    transform(employers: allEmployersResponse[], orgname: string): allEmployersResponse[] {
      if (!orgname || orgname.trim() === '') {
        return employers; // If search term is empty, return the original list
      }
    

    const filteredEmployers: allEmployersResponse[] = employers.filter(employer => 
        employer.employers[0].orgname.toLowerCase().includes(orgname.toLowerCase())
      );
  
      return filteredEmployers;
    }
  }
