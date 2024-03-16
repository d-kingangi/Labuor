CREATE OR ALTER PROCEDURE getTalentMessages
    @talentId int
AS
BEGIN
    SELECT * FROM messages WHERE talentId = @talentId
END