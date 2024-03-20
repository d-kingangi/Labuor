CREATE OR ALTER PROCEDURE getJobsForTalent
    @talentId VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        J.jobId,
        J.jobname,
        J.description,
        J.duration,
        J.startdate,
        J.salary,
        E.orgId,
        E.orgname AS employerName,
        T.talentId,
        T.firstname,
        T.lastname
    FROM
        Jobs J
    JOIN
        Employers E ON J.orgId = E.orgId
    JOIN
        Talents T ON J.talentId = T.talentId
    WHERE
        J.talentId = @talentId;
END
