CREATE OR ALTER PROCEDURE getTalentApplications
    @talentId VARCHAR(255)
AS
BEGIN
    SELECT a.applicationId, j.jobId, j.jobname, e.orgId, e.orgname AS employerName, a.status
    FROM jobs j
    JOIN applications a ON j.jobId = a.jobId
    JOIN employers e ON j.orgId = e.orgId
    WHERE a.talentId = @talentId;
END;


