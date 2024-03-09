CREATE OR ALTER PROCEDURE getSingleTalent
    @talentId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM talents
    WHERE talentId = @talentId;
END;
