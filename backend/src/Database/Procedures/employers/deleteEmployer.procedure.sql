CREATE OR ALTER PROCEDURE
deleteEmployer
(@orgId VARCHAR(255))
AS
BEGIN
    DELETE FROM employers
    WHERE orgId = @orgId;
END;