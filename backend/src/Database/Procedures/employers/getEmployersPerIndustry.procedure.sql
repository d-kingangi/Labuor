CREATE OR ALTER PROCEDURE getEmployersPerIndustry (@industryId VARCHAR(255))
AS 
BEGIN
SELECT * 
FROM employers
WHERE industryId = @industryId
END 