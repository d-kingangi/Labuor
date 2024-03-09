CREATE OR ALTER PROCEDURE getSingleJob
    @jobId VARCHAR(255)
AS
BEGIN
    SELECT
        jobs.jobId,
        jobs.jobname,
        jobs.orgId,
        employers.orgname AS employerName,
        jobs.industryId,
        industry.industryName AS industryName,
        jobs.description,
        jobs.duration,
        jobs.startdate,
        jobs.salary,
        jobs.talentId,
        talents.firstname AS talentFirstName,
        talents.lastname AS talentLastName
    FROM
        jobs
    JOIN
        employers ON jobs.orgId = employers.orgId
    JOIN
        industry ON jobs.industryId = industry.industryId
    LEFT JOIN
        talents ON jobs.talentId = talents.talentId
    WHERE
        jobs.jobId = @jobId;
END;
