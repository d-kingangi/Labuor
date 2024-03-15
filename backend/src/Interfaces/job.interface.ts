export interface applicant{
    talentId: string;
    firstname: string;
    lastname: string;
}

export interface job{
    jobId: string;
    jobname: string;
    orgId: string;
    industryId: string;
    description: string;
    duration: string; 
    startdate: Date;
    salary: BigInteger;
    applicants: applicant[]
    talentId: string;
}