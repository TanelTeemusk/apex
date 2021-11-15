@echo off

NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
	echo This setup needs admin permissions. Please run this file as admin.
	pause
	exit
)

set NODE_EXEC=node-v17.1.0-x64.msi
set SETUP_DIR=%~dp0

IF EXIST %SETUP_DIR%/%NODE_EXEC% (
	echo INSTALLING node ...
	cd %SETUP_DIR%
	START /WAIT %NODE_EXEC%
) ELSE (
	echo node.js installer missing!
)

start /WAIT cmd /c "npm install"
start /WAIT cmd /c "npm install forever -g"

SET OpenALPRPath=C:\Apex\openalpr_64\

reg add HKEY_CURRENT_USER\Environment /v path /t REG_EXPAND_SZ /d "%OpenALPRPath%;%PATH%" /f

MOVE ApexServer.bat "%AppData%\Microsoft\Windows\Start Menu\Programs\Startup\"

start /WAIT cmd /c "forever start --sourceDir C:\Apex\app\ app.js"

echo Installation Completed!

@echo off
echo.
echo press enter to exit
pause >nul
exit