CREATE PROCEDURE getEmployerMessages 
    @employerId VARCHAR(255)
AS
BEGIN
    SELECT * FROM messages WHERE orgId = @employerId;
END;