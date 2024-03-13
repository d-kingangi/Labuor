CREATE TABLE talents (
    talentId VARCHAR(255) PRIMARY KEY,
    profileImg VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    industryId VARCHAR(255),
    speciality VARCHAR(255),
    talentWallet VARCHAR(255),
    location VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255),
    FOREIGN KEY (industryId) REFERENCES industry(industryId)
);


-- DROP TABLE Talents
-- SELECT * FROM talents
-- DELETE FROM talents