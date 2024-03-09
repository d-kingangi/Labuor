CREATE OR ALTER PROCEDURE updateEmployer
    @orgId VARCHAR(255),
    @orgname VARCHAR(255),
    @email VARCHAR(255),
    @logo VARCHAR(255),
    @industryId VARCHAR(255),
    @employerWallet VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN
    UPDATE employers
    SET
        orgname = @orgname,
        email = @email,
        logo = @logo,
        industryId = @industryId,
        employerWallet = @employerWallet,
        password = @password
    WHERE orgId = @orgId;
END;
