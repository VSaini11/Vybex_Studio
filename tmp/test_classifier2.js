const fs = require('fs');
const code = fs.readFileSync('scout-extension/content/classifier.js', 'utf8');
const wrap = new Function('window', code + '\n return window.ScoutClassifier;');
const ScoutClassifier = wrap({});

const result = ScoutClassifier.classifyPost({ 
    text: "We are looking for a frontend developer. DM me your resume.", 
});
console.log('Test 3:', result);
console.log('Verdict 3:', ScoutClassifier.decide(result, 55));
