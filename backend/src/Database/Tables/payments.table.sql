CREATE TABLE payments (
    paymentId VARCHAR(255) PRIMARY KEY,
    employerWallet VARCHAR(255),
    talentWallet VARCHAR(255),
    jobId VARCHAR(255),
    FOREIGN KEY (jobId) REFERENCES jobs(jobId)
);