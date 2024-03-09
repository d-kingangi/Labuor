CREATE OR ALTER PROCEDURE deleteTalent
    @talentId VARCHAR(255)
AS
BEGIN
    DELETE FROM talents
    WHERE talentId = @talentId;
END;