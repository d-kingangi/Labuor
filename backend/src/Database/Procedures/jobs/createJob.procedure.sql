CREATE OR ALTER PROCEDURE createJob
    @jobId VARCHAR(255),
    @jobname VARCHAR(255),
    @orgId VARCHAR(255),
    @industryId VARCHAR(255),
    @description TEXT,
    @duration VARCHAR(255),
    @startdate DATETIME,
    @salary MONEY,
    @talentId VARCHAR(255)
AS
BEGIN
    INSERT INTO jobs (jobId, jobname, orgId, industryId, description, duration, startdate, salary, talentId)
    VALUES (@jobId, @jobname, @orgId, @industryId, @description, @duration, @startdate, @salary, @talentId);
END;
