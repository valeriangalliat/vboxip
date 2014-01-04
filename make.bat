@echo off
if not exist bin mkdir bin
\Windows\Microsoft.NET\Framework64\v4.0.30319\jsc.exe /out:bin/sshbox.exe /target:winexe src/sshbox.js
