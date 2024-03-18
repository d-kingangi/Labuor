CREATE TABLE review (
    reviewId VARCHAR(255) PRIMARY KEY,
    jobId VARCHAR(255),
    employerId VARCHAR(255),
    talentId VARCHAR(255),
    content TEXT,
    FOREIGN KEY (jobId) REFERENCES jobs(jobId),
    FOREIGN KEY (employerId) REFERENCES employers(employerId),
    FOREIGN KEY (talentId) REFERENCES talents(talentId)
)