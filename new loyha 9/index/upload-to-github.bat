@echo off
echo === GitHub'ga yuklash boshlandi ===

git init
git add .
git commit -m "birinchi yuklash"
git branch -M main
git remote remove origin
git remote add origin https://github.com/botirjonnizomov464-max/my-frontend-ai.git
git push -u origin main

echo === Yuklash tugadi! ===
pause
