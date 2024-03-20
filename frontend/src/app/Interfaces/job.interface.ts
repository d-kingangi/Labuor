export interface job{
    jobId: string;
    jobname: string;
    orgId: string;
    employerName: string; 
    industryId: string;
    industryName: string; 
    description: string;
    duration: string;
    startdate: Date;
    salary: number; 
    talentId: string;
    talentFirstName: string; 
    talentLastName: string;
}

export interface jobInfoResponse {
    message: string;
  }

export interface jobInfoResponse{
    job:[{
        jobId: string;
        jobname: string;
        orgId: string;
        employerName: string; 
        industryId: string;
        industryName: string; 
        description: string;
        duration: string;
        startdate: Date;
        salary: number; 
        talentId: string;
        talentFirstName: string; 
        talentLastName: string;
    }], 
    error: string
}

export interface allJobsResponse{
    jobs:[
        {
        jobId: string;
        jobname: string;
        orgId: string;
        employerName: string; 
        industryId: string;
        industryName: string; 
        description: string;
        duration: string;
        startdate: Date;
        salary: number; 
        talentId: string;
        talentFirstName: string; 
        talentLastName: string;
        }
    ],
    error: string
}