CREATE OR ALTER PROCEDURE loginTalent(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT * FROM talents WHERE email = @email
END