CREATE OR ALTER PROCEDURE
createEmployer
(
    @orgId VARCHAR(255),
    @orgname VARCHAR(255),
    @email VARCHAR(255),
    @logo VARCHAR(255),
    @industryId VARCHAR(255),
    @employerWallet VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
INSERT INTO
employers(orgId, orgname, email, logo, industryId, employerWallet, password)
VALUES(@orgId, @orgname, @email, @logo, @industryId, @employerWallet, @password)
END