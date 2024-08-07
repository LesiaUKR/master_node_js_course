const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////////
// FILES

// If the encoding option (like 'utf-8' or other) is specified then this function returns a string. Otherwise it returns a buffer.
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut); //Записуємо в файл output.txt
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data)=>{
//       console.log(data);
// })

//console.log('Reading file...'); //Цей рядок виведеться першим, оскільки readFile є асинхронним і не блокує виконання коду

//читаємо файл на основі попереднього вмісту файлу
// fs.readFile('./txt/starttttt.txt', 'utf-8', (err, data1)=>{
//    if(err) return console.log('ERROR! 💥');
//    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//       console.log(data2);
//       fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3)=>{
//          console.log(data3);
//          fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err=>{
//             console.log('Your file has been written 😁');
//          })
//       })
//    })
// })

// console.log('Will read file!'); //Цей рядок виведеться першим, оскільки readFile є асинхронним і не блокує виконання коду

//////////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); //перетворюємо JSON-рядок на об'єкт JavaScript


// створюємо сервер за допомогою http модуля
const server = http.createServer((req, res) => {
  console.log(req.url); //Виводимо запит в консоль два рази, оскільки браузер робить два запити: один на localhost:8000, другий на favicon.ico
  const pathName = req.url; //зберігаємо шлях запиту в змінну pathName
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    //${__dirname} - це змінна, яка містить шлях до поточної папки
     //читаємо файл data.json
   //  fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
   //    if (err) {
   //       res.writeHead(500, { 'Content-type': 'text/html' });
   //       res.end("<h1>Internal Server Error!</h1>");
   //       return;
   //     }
   //    const productData = JSON.parse(data); //перетворюємо JSON-рядок на об'єкт JavaScript
   //    res.writeHead(200, { 'Content-type': 'application/json' });
   //    res.end(data); //Відправляємо відповідь на запит у вигляді JSON-рядка
   //  });

   res.writeHead(200, { 'Content-type': 'application/json' });
   res.end(data); //Відправляємо відповідь на запит у вигляді JSON-рядка
  } else {
    //має бути відправлений перед відправкою відповіді
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    }); //Відправляємо заголовок відповіді з кодом 404
    res.end("<h1>Page not found!</h1>"); //Відправляємо відповідь на запит
  }
});

//Запускаємо сервер на порту 8000 і слухаємо запити на localhost
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
