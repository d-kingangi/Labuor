import { Pipe, PipeTransform } from '@angular/core';
import { allJobsResponse } from '../Interfaces/job.interface'

@Pipe({
  name: 'searchJob',
  standalone: true
})
export class SearchJobPipe implements PipeTransform {

    transform(jobs: allJobsResponse[], jobname: string): allJobsResponse[] {
      if (!jobname || jobname.trim() === '') {
        return jobs; // If search term is empty, return the original list
      }
      
      const filteredJobs: allJobsResponse[] = jobs.filter(job => 
        job.jobs[0].jobname.toLowerCase().includes(jobname.toLowerCase())
      );
  
      return filteredJobs;
    }
  }