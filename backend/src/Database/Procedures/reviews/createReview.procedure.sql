CREATE OR ALTER PROCEDURE createReview
    @reviewId VARCHAR(255),
    @orgId VARCHAR(255),
    @talentId VARCHAR(255),
    @comment TEXT
AS
BEGIN
    INSERT INTO review(reviewId, orgId, talentId, comment)
    VALUES (@reviewId, @orgId, @talentId, @comment)
END