CREATE OR ALTER PROCEDURE createApplication 
(
    @applicationId VARCHAR(255),
    @jobId VARCHAR(255), 
    @orgId VARCHAR(255), 
    @talentId VARCHAR(255)) 
AS
BEGIN
INSERT INTO
applications (applicationId, jobId, orgId, talentId)
VALUES
(@applicationId, @jobId, @orgId, @talentId)
END
