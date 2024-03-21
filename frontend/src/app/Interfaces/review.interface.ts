export interface review{
    reviewId: string;
    talentId: string;
    orgId: string;
    comment: string;
    talentFirstName?: string; // Optional field for talent's first name
    talentLastName?: string;  // Optional field for talent's last name
    orgName?: string;
}

export interface reviewInfoResponse{
    review:[{
        reviewId: string;
        talentId: string;
        orgId: string;
        comment: string;
        talentFirstName?: string; // Optional field for talent's first name
        talentLastName?: string;  // Optional field for talent's last name
        orgName?: string;
    }], 
    error: string
}

export interface allReviewsResponse{
    reviews:[
        {
            reviewId: string;
            talentId: string;
            orgId: string;
            comment: string;
            talentFirstName?: string; 
            talentLastName?: string;
            orgName?: string;
        }
    ],
    error: string
}
