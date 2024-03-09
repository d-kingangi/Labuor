CREATE OR ALTER PROCEDURE getJobsByEmployer
    @orgId VARCHAR(255)
AS
BEGIN
    -- Retrieve details of jobs posted by the employer
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
        jobs.orgId = @orgId

    UNION

    -- Retrieve additional details about the industry and employer
    SELECT
        NULL AS jobId,
        NULL AS jobname,
        NULL AS orgId,
        NULL AS employerName,
        industry.industryId,
        industry.industryName AS industryName,
        NULL AS description,
        NULL AS duration,
        NULL AS startdate,
        NULL AS salary,
        NULL AS talentId,
        NULL AS talentFirstName,
        NULL AS talentLastName
    FROM
        industry
    WHERE
        industry.industryId IN (SELECT industryId FROM jobs WHERE orgId = @orgId)

    UNION

    SELECT
        NULL AS jobId,
        NULL AS jobname,
        NULL AS orgId,
        NULL AS employerName,
        NULL AS industryId,
        NULL AS industryName,
        NULL AS description,
        NULL AS duration,
        NULL AS startdate,
        NULL AS salary,
        NULL AS talentId,
        NULL AS talentFirstName,
        NULL AS talentLastName
    FROM
        employers
    WHERE
        orgId = @orgId;
END;
