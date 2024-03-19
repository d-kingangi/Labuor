CREATE OR ALTER PROCEDURE getTalentMessages
    @talentId VARCHAR(255)
AS
BEGIN
    SELECT m.messageId, m.content, m.timestamp, m.isDeleted, m.isRead,
           t.firstname AS talentFirstname, t.lastname AS talentLastname,
           e.orgname AS employerOrgname,
           m.talentId, m.orgId AS orgId
    FROM messages m
    LEFT JOIN talents t ON m.talentId = t.talentId
    LEFT JOIN employers e ON m.orgId = e.orgId
    WHERE m.talentId = @talentId;
END;

