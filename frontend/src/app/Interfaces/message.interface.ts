 export interface message{
    orgId: string;
    talentId: string;
    content: string;
    timestamp: Date
}

export interface messageInfoResponse{
    message: {
        messageId: string;
        orgId: string;
        talentId: string;
        content: string
        timestamp: Date
    },
    error: string
}

export interface allMessagesResponse{
    messages:[
        {
            messageId: string;
            orgId: string;
            talentId: string;
            content: string
            timestamp: Date
        }
    ], 
    error: string
}