@echo off
title Smyrne 1894 Harita Sunucusu (Leaflet)
echo ==========================================================
echo  Smyrne 1894 Yerel Harita Sunucusu Baslatiliyor...
echo ==========================================================
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0start-server.ps1"
pause
