@echo off
tasklist | find /i "TestComplete.exe" > nul
if %errorlevel% equ 0 (
    taskkill /f /im TestComplete.exe
    echo TestComplete.exe was closed.
) else (
    echo TestComplete.exe is not running.
)
cd "C:\Program Files (x86)\SmartBear\TestComplete 15\Bin"
TestComplete.exe "C:\Trunk\EDP_Automation\EDP_Automation\AE-Inbox\AE-Inbox.mds" /r /p:AE-Inbox /t:KeywordTests\AEInboxCable_QA.tcKDTest