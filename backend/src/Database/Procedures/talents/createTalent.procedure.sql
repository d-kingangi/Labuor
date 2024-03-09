CREATE OR ALTER PROCEDURE CreateTalent
    @talentId VARCHAR(255),
    @profileImg VARCHAR(255),
    @firstname VARCHAR(255),
    @lastname VARCHAR(255),
    @email VARCHAR(255),
    @industryId VARCHAR(255),
    @speciality VARCHAR(255),
    @talentWallet VARCHAR(255),
    @location VARCHAR(255),
    @phone VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO talents (talentId, profileImg, firstname, lastname, email, industryId, speciality, talentWallet, location, phone, password)
    VALUES (@talentId, @profileImg, @firstname, @lastname, @email, @industryId, @speciality, @talentWallet, @location, @phone, @password);
END;
