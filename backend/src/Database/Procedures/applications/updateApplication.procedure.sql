CREATE OR ALTER PROCEDURE updateApplication
    @applicationId VARCHAR(255),
    @status VARCHAR(255)
AS
BEGIN
    UPDATE applications
    SET "status" = @status
    WHERE applicationId = @applicationId;
END;