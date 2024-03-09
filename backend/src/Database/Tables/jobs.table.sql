CREATE TABLE jobs (
    jobId VARCHAR(255) PRIMARY KEY,
    jobname VARCHAR(255),
    orgId VARCHAR(255),
    industryId VARCHAR(255),
    description TEXT,
    duration VARCHAR(255),
    startdate DATETIME,
    salary MONEY,
    talentId VARCHAR(255),
    FOREIGN KEY (orgId) REFERENCES employers(orgId),
    FOREIGN KEY (industryId) REFERENCES industry(industryId),
    FOREIGN KEY (talentId) REFERENCES talents(talentId)
);