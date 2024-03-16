CREATE OR ALTER PROCEDURE createMessage 
    @messageId VARCHAR(255),
    @orgId VARCHAR(255),
    @talentId VARCHAR(255),
    @content TEXT,
    @timestamp DATETIME
AS
BEGIN
    INSERT INTO messages (messageId, orgId, talentId, content, timestamp)
    VALUES (@messageId, @orgId, @talentId, @content, @timestamp);
END;