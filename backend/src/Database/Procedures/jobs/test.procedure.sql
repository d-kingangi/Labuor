CREATE OR ALTER PROCEDURE getAllJobsByIndustry
    @industryId VARCHAR(255)
AS
BEGIN
    SELECT * FROM jobs
    WHERE industryId = @industryId
    END;

    