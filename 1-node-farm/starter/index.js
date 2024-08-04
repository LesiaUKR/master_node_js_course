
const fs = require('fs');

// If the encoding option (like 'utf-8' or other) is specified then this function returns a string. Otherwise it returns a buffer.
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); 
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut); //Записуємо в файл output.txt
console.log('File written!');