CREATE OR ALTER PROCEDURE getEveryJob
AS
BEGIN
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

    UNION

    -- Retrieve additional details about the industry and employer
    SELECT
        NULL AS jobId,
        NULL AS jobname,
        NULL AS orgId,
        employers.orgname AS employerName,
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
    JOIN
        employers ON 1 = 1

    UNION

    SELECT
        NULL AS jobId,
        NULL AS jobname,
        NULL AS orgId,
        employers.orgname AS employerName,
        NULL AS industryId,
        NULL AS industryName,
        NULL AS description,
        NULL AS duration,
        NULL AS startdate,
        NULL AS salary,
        NULL AS talentId,
        talents.firstname AS talentFirstName,
        talents.lastname AS talentLastName
    FROM
        talents
    JOIN
        employers ON 1 = 1;
END;