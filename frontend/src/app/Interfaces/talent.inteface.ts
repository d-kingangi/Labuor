export interface talent{
    UserType: string;
    talentId: string;
    profileImg: string;
    firstname: string;
    lastname: string;
    email: string;
    industryId: string;
    speciality: string;
    talentWallet: string;
    location: string;
    phone: string;
    password: string;
}

export interface talentInfoResponse{
    message: string,
}

export interface talentInfoResponse{
    talent: [
        {
        UserType: string;
        talentId: string;
        profileImg: string;
        firstname: string;
        lastname: string;
        email: string;
        industryId: string;
        speciality: string;
        talentWallet: string;
        location: string;
        phone: string;
        password: string;
    }
], 
    error: string
}


export interface allTalentsResponse{
    talents:[
        {
            UserType: string;
            talentId: string;
            profileImg: string;
            firstname: string;
            lastname: string;
            email: string;
            industryId: string;
            speciality: string;
            talentWallet: string;
            location: string;
            phone: string;
            password: string;
        }
    ],
    error: string
}