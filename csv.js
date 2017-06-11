const fs = require('fs');
const text = fs.readFileSync('./data/spam.csv', 'utf-8');

const lines = text.split(/,/g)
    .map(line => line.replace(/\r\n|\n/g, ' ').trim())
    .filter(line => line.length)
    .map(line => `1 ${line.replace('"', '')}`);

fs.writeFileSync('./data/csv.txt', lines.join('\n'));
