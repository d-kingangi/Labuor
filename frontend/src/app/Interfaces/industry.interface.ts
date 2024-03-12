export interface industry {
    industryId: string;
    industryName: string;
  }

  export interface industryInfoResponse{
    info:{
        industryId: string;
        industryName: string
    }, 
    error: string
  }

  export interface allIndustriesResponse{
    industries:[
        {
            industryId: string;
            industryName: string
        }
    ],
    error: string
  }

