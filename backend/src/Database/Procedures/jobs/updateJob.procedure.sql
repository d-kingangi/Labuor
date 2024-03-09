CREATE OR ALTER PROCEDURE UpdateJob
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
    UPDATE jobs
    SET
        jobname = @jobname,
        orgId = @orgId,
        industryId = @industryId,
        description = @description,
        duration = @duration,
        startdate = @startdate,
        salary = @salary,
        talentId = @talentId
    WHERE jobId = @jobId;
END;
