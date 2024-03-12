export interface employer{
    orgname: string;
    email: string;
    logo: string;
    industryId: string;
    employerWallet: string;
    password: string;
}

export interface employerResponse{
    message: string,
}

export interface employerInfoResponse{
    info:{
        orgId: string;
        orgname: string;
        email: string;
        logo: string;
        industryId: string;
        employerWallet: string;
        password: string;
    }, 
    error: string
}

export interface allEmployersResponse{
    employers:[
        {
            orgId: string;
            orgname: string;
            email: string;
            logo: string;
            industryId: string;
            employerWallet: string;
            password: string;
        }
    ],
    error: string
}