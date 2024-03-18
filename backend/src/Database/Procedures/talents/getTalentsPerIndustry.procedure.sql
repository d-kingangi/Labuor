CREATE OR ALTER PROCEDURE getTalentsPerIndustry (@industryId VARCHAR(255))
AS 
BEGIN
SELECT * 
FROM talents
WHERE industryId = @industryId
END 


