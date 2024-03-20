CREATE TABLE applications(
    applicationId VARCHAR(255) PRIMARY KEY,
    jobId VARCHAR(255),
    orgId VARCHAR(255),
    talentId VARCHAR(255),
    "status" VARCHAR(255) CHECK ("status" IN ('PENDING', 'ACCEPTED', 'REJECTED')) DEFAULT 'PENDING',
    FOREIGN KEY (jobId) REFERENCES jobs(jobId),
    FOREIGN KEY (talentId) REFERENCES talents(talentId),
    FOREIGN KEY (orgId) REFERENCES employers(orgId)
)
