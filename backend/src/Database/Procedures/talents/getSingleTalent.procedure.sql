-- CREATE OR ALTER PROCEDURE getSingleTalent
--     @talentId VARCHAR(255)
-- AS
-- BEGIN
--     SELECT *
--     FROM talents
--     WHERE talentId = @talentId;
-- END;

CREATE OR ALTER PROCEDURE getSingleTalentWithIndustry
    @talentId VARCHAR(255)
AS
BEGIN
    SELECT t.*, i.industryName
    FROM talents t
    INNER JOIN industry i ON t.industryId = i.industryId
    WHERE t.talentId = @talentId;
END;
