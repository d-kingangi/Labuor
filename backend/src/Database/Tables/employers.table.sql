CREATE TABLE employers (
    orgId VARCHAR(255) PRIMARY KEY,
    orgname VARCHAR(255),
    email VARCHAR(255) UNIQUE, 
    logo VARCHAR(255),
    industryId VARCHAR(255),
    employerWallet VARCHAR(255) ,
    password VARCHAR(255),
    isWelcomed BIT DEFAULT 0,
    isVerified BIT DEFAULT 0,
    FOREIGN KEY (industryId) REFERENCES industry(industryId)
);

DELETE FROM employers

SELECT * FROM employers

ALTER TABLE employers ADD isWelcomed BIT DEFAULT 0
ALTER TABLE employers ADD isVerified BIT DEFAULT 0

UPDATE employers
SET logo = 'https://mma.prnewswire.com/media/887737/Soramitsu_Logo.jpg'