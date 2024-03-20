CREATE OR ALTER PROCEDURE checkExistingApplication
    @jobId VARCHAR(255),
    @talentId VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Count INT;
    SELECT @Count = COUNT(*)
    FROM applications
    WHERE jobId = @jobId
    AND talentId = @talentId;

    SELECT @Count AS count;
END;
