CREATE OR ALTER PROCEDURE getTalentApplications
    @talentId VARCHAR(255)
AS
BEGIN
    SELECT j.jobId, j.jobname
    FROM jobs j
    JOIN applications a ON j.jobId = a.jobId
    WHERE a.talentId = @talentId;
END;


