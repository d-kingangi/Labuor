--gets jobs within the industry by industryId

CREATE OR ALTER PROCEDURE getAllJobsByIndustry
    @industryId VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve details of jobs in the specified industry
    SELECT
        jobs.jobId,
        jobs.jobname,
        jobs.orgId,
        employers.orgname AS employerName,
        jobs.industryId,
        industry.industryName AS industryName,
        CAST(jobs.description AS VARCHAR(MAX)) AS description,
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
        jobs.industryId = @industryId;
END;


