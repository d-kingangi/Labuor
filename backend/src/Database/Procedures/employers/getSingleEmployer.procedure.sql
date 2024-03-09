CREATE OR ALTER PROCEDURE
getSingleEmployer (@orgId VARCHAR(255))
AS 
BEGIN
SELECT *
    FROM employers
    WHERE orgId = @orgId;
END;