CREATE OR ALTER PROCEDURE updateMessageStatus 
    @messageId VARCHAR(255),
    @status BIT
AS
BEGIN
    UPDATE messages SET isRead = @status WHERE messageId = @messageId;
END;