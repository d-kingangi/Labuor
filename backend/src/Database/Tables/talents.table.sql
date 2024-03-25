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
    isWelcomed BIT DEFAULT 0,
    isVerified BIT DEFAULT 0,
    FOREIGN KEY (industryId) REFERENCES industry(industryId)
);


ALTER TABLE talents ADD isWelcomed BIT DEFAULT 0
ALTER TABLE talents ADD isVerified BIT DEFAULT 0

-- DROP TABLE Talents
SELECT * FROM talents
-- DELETE FROM talents

ALTER TABLE 

-- UPDATE talents
-- SET profileImg = 'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
