CREATE TABLE jobs (
    jobId VARCHAR(255) PRIMARY KEY,
    jobname VARCHAR(255),
    orgId VARCHAR(255),
    industryId VARCHAR(255),
    description TEXT,
    duration VARCHAR(255),
    startdate DATETIME,
    salary MONEY,
    applicants TEXT  --stores an array of applicants
    talentId VARCHAR(255),
    FOREIGN KEY (orgId) REFERENCES employers(orgId),
    FOREIGN KEY (industryId) REFERENCES industry(industryId),
    FOREIGN KEY (talentId) REFERENCES talents(talentId)
);

ALTER TABLE jobs 
ADD applicants TEXT

DELETE FROM jobs

SELECT * FROM jobs
