// var _ = require('lodash');
// console.log(_.random(1, 50));

var fs = require('fs');
var data = require('./data.json');

console.log(data, data.name);

// fs.readFile('./data.json', 'utf-8', function(err, data) {
fs.readFile('./data.json', 'utf-8', (err, data) => {
    var data = JSON.parse(data);
    console.log(data, data.name);
});
