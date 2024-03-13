CREATE TABLE employers (
    orgId VARCHAR(255) PRIMARY KEY,
    orgname VARCHAR(255),
    email VARCHAR(255) UNIQUE, 
    logo VARCHAR(255),
    industryId VARCHAR(255),
    employerWallet VARCHAR(255) ,
    password VARCHAR(255),
    FOREIGN KEY (industryId) REFERENCES industry(industryId)
);

DELETE FROM employers

SELECT * FROM employers