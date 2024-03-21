export interface application{
    orgId: string
    jobId: string
    talentId: string
}

export interface applicationResponse{
    message: string
}

export interface applicationInfoResponse{
    application:[{
        applicationId: string
        status: string
        jobId: string
        jobname: string
        talentId: string
        firstname: string
        lastname: string
        orgId: string
        orgname: string
    }]
    error: string
}

export interface allApplicationsResponse{
    applications:[{
        applicationId: string
        status: string
        jobId: string
        jobname: string
        talentId: string
        firstname: string
        lastname: string
        orgId: string
        orgname: string
    }]
    error: string
}

export interface updateApplicationPayload {
    status: string;
  }