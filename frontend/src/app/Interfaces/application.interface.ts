export interface application{
    applicationId: string
    jobId: string
    talentId: string
    status: string
    timestamp: Date
}

export interface applicationInfoResponse{
    application:[{
        applicationId: string
        jobId: string
        talentId: string
        status: string
        timestamp: Date
    }]
    error: string
}

export interface allApplicationsResponse{
    applications:[{
        applicationId: string
        jobId: string
        talentId: string
        status: string
        timestamp: Date
    }]
    error: string
}