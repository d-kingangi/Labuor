CREATE OR ALTER PROCEDURE UpdateUserAsWelcomed
AS
BEGIN
    UPDATE talents SET isWelcomed  = 1 WHERE isWelcomed = 0;
 
    UPDATE employers SET isWelcomed = 1 WHERE isWelcomed = 0;
END;