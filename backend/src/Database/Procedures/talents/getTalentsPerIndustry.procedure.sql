CREATE OR ALTER PROCEDURE getTalentPerIndustry (@industryId VARCHAR(255))
AS 
BEGIN
SELECT * 
FROM talents
WHERE industryId = @industryId
END 

