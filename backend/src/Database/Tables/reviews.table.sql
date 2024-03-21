CREATE TABLE review (
    reviewId VARCHAR(255) PRIMARY KEY,
    orgId VARCHAR(255),
    talentId VARCHAR(255),
    comment TEXT,
    FOREIGN KEY (orgId) REFERENCES employers(orgId),
    FOREIGN KEY (talentId) REFERENCES talents(talentId)
)

SELECT * FROM review

DROP TABLE review