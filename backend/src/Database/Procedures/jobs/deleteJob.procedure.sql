CREATE OR ALTER PROCEDURE deleteJob
    @jobId VARCHAR(255)
AS
BEGIN
    DELETE FROM jobs
    WHERE jobId = @jobId;
END;