CREATE OR ALTER PROCEDURE loginEmployer(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT * FROM employers WHERE email = @email
END