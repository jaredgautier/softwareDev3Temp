let fs = require("fs");
fs.readFile("./text.txt", (err, data) => {
if (err) throw err; //callbacks usually get errors in this format
//err will either contain the error or null
console.log(data); //if there weren't errors, send the data to the console
})
