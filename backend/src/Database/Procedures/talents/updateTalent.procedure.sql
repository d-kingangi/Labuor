CREATE OR ALTER PROCEDURE updateTalent
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
    UPDATE talents
    SET
        profileImg = @profileImg,
        firstname = @firstname,
        lastname = @lastname,
        email = @email,
        industryId = @industryId,
        speciality = @speciality,
        talentWallet = @talentWallet,
        location = @location,
        phone = @phone,
        password = @password
    WHERE talentId = @talentId;
END;


