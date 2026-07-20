const fs = require('fs');
const code = fs.readFileSync('scout-extension/content/classifier.js', 'utf8');
const wrap = new Function('window', code + '\n return window.ScoutClassifier;');
const ScoutClassifier = wrap({});

const nonHiringTexts = [
  "Just launched our new product today!",
  "Great insights from this conference about the future of AI.",
  "Check out this article on 10 ways to improve your productivity.",
  "Excited to announce our Q3 earnings were above expectations.",
  "What is your favorite programming language and why?",
  "Happy birthday to my amazing coworker!",
  "I am looking for a new job. Please let me know if you know of any open positions for a software engineer."
];

for (const t of nonHiringTexts) {
  const result = ScoutClassifier.classifyPost({ text: t });
  console.log(`Text: "${t.slice(0, 30)}..." -> Score: ${result.score}, Verdict: ${ScoutClassifier.decide(result, 55) ? 'SHOW' : 'HIDE'}`);
}
