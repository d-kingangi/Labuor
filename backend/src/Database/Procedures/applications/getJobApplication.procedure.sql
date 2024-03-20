CREATE OR ALTER PROCEDURE getJobApplications
    @jobId VARCHAR(255)
AS
BEGIN
    SELECT j.jobId, j.jobname, t.talentId, t.firstname, t.lastname, e.orgId, e.orgname
    FROM jobs j
    JOIN applications a ON j.jobId = a.jobId
    JOIN talents t ON a.talentId = t.talentId
    JOIN employers e ON j.orgId = e.orgId
    WHERE j.jobId = @jobId;
END;


