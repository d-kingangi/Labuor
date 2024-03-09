CREATE OR ALTER PROCEDURE getOneIndustry (@industryId VARCHAR(255))
AS
BEGIN
    SELECT * FROM industry WHERE industryId = @industryId
END