CREATE TABLE messages (
    messageId VARCHAR(255) PRIMARY KEY,
    orgId VARCHAR(255),
    talentId VARCHAR(255),
    content TEXT,
    timestamp DATETIME,
    isDeleted BIT DEFAULT 0;
    isRead BIT DEFAULT 0;
    FOREIGN KEY (orgId) REFERENCES employers(orgId),
    FOREIGN KEY (talentId) REFERENCES talents(talentId)
);

-- DROP TABLE Messages
ALTER TABLE messages 
ADD isDeleted BIT DEFAULT 0;

ALTER TABLE messages 
ADD isRead BIT DEFAULT 0;