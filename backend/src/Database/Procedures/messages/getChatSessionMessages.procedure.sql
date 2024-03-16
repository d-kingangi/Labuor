CREATE OR ALTER PROCEDURE getChatSessionMessages 
    @talentId VARCHAR(255),
    @employerId VARCHAR(255)
AS
BEGIN
    SELECT * FROM messages 
    WHERE talentId = @talentId AND orgId = @employerId;
END