CREATE OR ALTER PROCEDURE deleteIndustry (@industryId VARCHAR(255))
AS
BEGIN
    DELETE FROM industry WHERE industryId = @industryId
END