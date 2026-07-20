const fs = require('fs');
const code = fs.readFileSync('scout-extension/content/classifier.js', 'utf8');

// Load it by wrapping it in a function that provides `window`
const wrap = new Function('window', code + '\n return window.ScoutClassifier;');
const ScoutClassifier = wrap({});

const result = ScoutClassifier.classifyPost({ 
    text: 'We are hiring a software engineer! Apply now.', 
    hashtags: '#hiring #jobs' 
});
console.log('Test 1:', result);
console.log('Verdict 1:', ScoutClassifier.decide(result, 55));

const result2 = ScoutClassifier.classifyPost({ 
    text: 'I am thrilled to announce that I joined Google!', 
    hashtags: '#newjob' 
});
console.log('Test 2:', result2);
console.log('Verdict 2:', ScoutClassifier.decide(result2, 55));
