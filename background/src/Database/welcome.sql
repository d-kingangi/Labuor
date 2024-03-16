CREATE OR ALTER PROCEDURE WelcomeExisting
AS
BEGIN
    SELECT *
    FROM talents
    WHERE isWelcomed = 0
    
    UNION
    
    SELECT *
    FROM employers
    WHERE isWelcomed = 0 
END