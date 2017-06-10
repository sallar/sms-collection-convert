const fs = require('fs');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
tfidf.addFileSync('./data/SMSSpamCollection');

const file = fs.readFileSync('./data/SMSSpamCollectionWithClass', 'utf-8');
const lines = file.split(/\n/g).filter(line => line.length > 0);
let output = '';

lines.forEach(line => {
    const hamOrSpam = line.substr(0, 1);
    const text = line.substr(2);
    const words = tokenizer.tokenize(text);
    const scores = words.map(word => parseFloat(tfidf.tfidfs(word, 0)));
    const wordCount = scores.filter(score => score > 0).length;
    const score = scores.reduce((total, score) => {
        return total + score;
    }, 0);

    output += `${score} --- ${wordCount} --- ${hamOrSpam}\n`;
});

fs.writeFileSync('./data/result.txt', output);
