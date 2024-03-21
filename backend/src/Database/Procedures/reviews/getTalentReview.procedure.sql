CREATE OR ALTER PROCEDURE getTalentReview
    @talentId VARCHAR(255)
AS
BEGIN
    SELECT r.reviewId,
           r.comment,
           t.firstName AS talentFirstName,
           t.lastName AS talentLastName,
           e.orgName
    FROM review r
    INNER JOIN talents t ON r.talentId = t.talentId
    INNER JOIN employers e ON r.orgId = e.orgId
    WHERE r.talentId = @talentId; 
END
