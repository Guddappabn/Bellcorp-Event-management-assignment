@echo off
echo This script aligns the project structure as requested.
echo.

:: Remove empty client folder if present to allow rename
if exist client (
    rmdir /s /q client
)

:: Rename frontend to client
if exist frontend (
    ren frontend client
    if errorlevel 1 (
        echo Error: Could not rename 'frontend' to 'client'.
        echo Please stop any running servers (npm run dev) and close terminals inside 'frontend'.
        pause
        exit /b 1
    )
)

echo.
echo Project structure alignment complete!
echo You can now run the application from the 'client' directory.
pause
