const { parseString } = require('xml2js');
const fs = require('fs');

const text = fs.readFileSync('./data/spam.xml', 'utf-8');

parseString(text, (err, result) => {
    if (err) {
        throw err;
    }

    const data = result.smses.sms.map(res => res['$'].body);
    fs.writeFileSync('./data/spam.txt', data.join("\n---\n"));
});
