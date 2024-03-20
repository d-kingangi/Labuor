CREATE OR ALTER PROCEDURE deleteApplication 
    @applicationId VARCHAR(255)
AS
BEGIN
    DELETE FROM applications WHERE applicationId = @applicationId;
END
