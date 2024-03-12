export interface job{
    jobname: string;
    orgId: string;
    industryId: string;
    description: string;
    duration: string; 
    startdate: Date;
    salary: BigInteger;
    talentId: string;
}

export interface jobInfoResponse{
    info:{
        jobId: string;
        jobname: string;
        orgId: string;
        industryId: string;
        description: string;
        duration: string; 
        startdate: Date;
        salary: BigInteger;
        talentId: string;
    }, 
    error: string
}

export interface allJobsResponse{
    jobs:[
        {
            jobId: string;
            jobname: string;
            orgId: string;
            industryId: string;
            description: string;
            duration: string; 
            startdate: Date;
            salary: BigInteger;
            talentId: string;
        }
    ],
    error: string
}