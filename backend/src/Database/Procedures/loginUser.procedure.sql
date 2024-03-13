
CREATE OR ALTER PROCEDURE loginUser
(
    @email VARCHAR(250),
    @password VARCHAR(250)
)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM talents WHERE email = @email)
    BEGIN
        SELECT 'Talent' AS UserType, * 
        FROM talents 
        WHERE email = @email
    END
    
    ELSE IF EXISTS (SELECT 1 FROM employers WHERE email = @email)
    BEGIN
        SELECT 'Employer' AS UserType, * 
        FROM employers 
        WHERE email = @email
    END
    
    ELSE
    BEGIN
        SELECT NULL AS UserType, NULL AS UserID, NULL AS email, NULL AS password
    END
END

