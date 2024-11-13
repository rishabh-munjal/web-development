
let fs = require('fs');

fs.readFile('a.txt', 'utf-8', function(err, data) {
    console.log('data from fs: ', data);
})

fs.writeFile('a.txt', 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });