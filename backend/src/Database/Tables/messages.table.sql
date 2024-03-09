CREATE TABLE messages (
    messageId VARCHAR(255) PRIMARY KEY,
    orgId VARCHAR(255),
    talentId VARCHAR(255),
    content TEXT,
    timestamp DATETIME,
    FOREIGN KEY (orgId) REFERENCES Employers(orgId),
    FOREIGN KEY (talentId) REFERENCES Talents(talentId)
);

-- DROP TABLE Messages