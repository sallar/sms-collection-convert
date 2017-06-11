const fs = require('fs');

const text = fs.readFileSync('./data/final.txt', 'utf-8');
const lines = text.split("\n<->\n").map(line => line.replace(/\n/g, ' ').trim());

fs.writeFileSync('./data/final-normalized.txt', lines.join('\n'));
