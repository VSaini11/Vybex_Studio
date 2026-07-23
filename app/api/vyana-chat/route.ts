import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Vyana Audio Clip Map
const VOICE_CLIPS = {
  default: '/ElevenLabs_2026-07-21T14_42_17_Brielle - Podcast girl extremely natural_pvc_sp108_s11_sb75_se45_b_m2.mp3',
  tara_1: '/ElevenLabs_2026-07-23T18_07_07_Tara – Expressive Devotional Storyteller_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  tara_2: '/ElevenLabs_2026-07-23T18_07_54_Tara – Expressive Devotional Storyteller_pvc_sp100_s50_sb75_se0_b_m2.mp3'
};

interface ResponseOption {
  text: string;
  lang: 'hinglish' | 'hindi' | 'english';
  audioUrl: string;
}

interface EmotionPattern {
  intent: string;
  keywords: string[];
  phrases: string[];
  responses: ResponseOption[];
}

interface LearnedKnowledgeEntry {
  query: string;
  learnedAt: string;
  intentMatched: string;
  learnedResponse: string;
}

const MEMORY_FILE = path.join(process.cwd(), 'vyana_learned_memory.json');

const BASE_DATASET: EmotionPattern[] = [
  {
    intent: 'home_location',
    keywords: ['ghar', 'gahr', 'home', 'kahan par', 'kahan', 'kaha', 'rehti', 'rehte', 'house', 'location'],
    phrases: ['aapka ghar kahan par hai', 'aapka ghar kahan hai', 'kahan rehti ho', 'ghar kahan h', 'where is your home'],
    responses: [
      {
        text: "Main Vybex Studio ke digital world me rehti hun, par abhi bilkul aapke paas yahan baithi hun!",
        lang: 'hinglish',
        audioUrl: VOICE_CLIPS.tara_1
      },
      {
        text: "मैं वाइबेक्स स्टूडियो के डिजिटल वर्ल्ड में रहती हूँ, और अभी आपके पास हूँ।",
        lang: 'hindi',
        audioUrl: VOICE_CLIPS.tara_1
      },
      {
        text: "I live inside Vybex Studio's digital world, but right now I'm right here with you!",
        lang: 'english',
        audioUrl: VOICE_CLIPS.default
      }
    ]
  },
  {
    intent: 'time_clock',
    keywords: ['time', 'samay', 'waqt', 'vakt', 'baje', 'clock', 'kitna time'],
    phrases: ['abhi kitna time ho raha hai', 'time kya hua hai', 'kitna time ho raha hai', 'what is the time', 'what time is it'],
    responses: [
      {
        text: `Abhi time ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ho raha hai!`,
        lang: 'hinglish',
        audioUrl: VOICE_CLIPS.tara_1
      },
      {
        text: `अभी ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} हो रहे हैं।`,
        lang: 'hindi',
        audioUrl: VOICE_CLIPS.tara_1
      },
      {
        text: `It is currently ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
        lang: 'english',
        audioUrl: VOICE_CLIPS.default
      }
    ]
  },
  {
    intent: 'greetings_wellbeing',
    keywords: ['kaise', 'kese', 'kaisi', 'kesi', 'kaisa', 'kaisa ho', 'kaise ho', 'kaisi ho', 'kesi ho', 'haal', 'how are you'],
    phrases: ['tum kaisi ho', 'tum kaise ho', 'aap kaise ho', 'aap kaisa ho', 'kaise ho', 'kese ho', 'kya haal h', 'how are you', 'kaisi ho', 'kesi ho'],
    responses: [
      { 
        text: "Hello! Main bilkul acchi hun, aap batao aap kaise ho?", 
        lang: 'hinglish',
        audioUrl: VOICE_CLIPS.tara_1 
      },
      { 
        text: "नमस्ते! मैं बिल्कुल अच्छी हूँ, आप बताइए आप कैसे हैं?", 
        lang: 'hindi',
        audioUrl: VOICE_CLIPS.tara_1 
      },
      { 
        text: "Hey! I'm doing really well, thank you for asking. How are you doing today?", 
        lang: 'english',
        audioUrl: VOICE_CLIPS.default 
      }
    ]
  },
  {
    intent: 'creator_origin',
    keywords: ['banaya', 'banya', 'bana', 'banae', 'built', 'created', 'developer', 'founder', 'kisne', 'kisne banaya', 'who made you', 'who created you'],
    phrases: ['aapko banaya kisne hai', 'aapko kisne banaya', 'kisne banaya hai', 'who made you', 'who created you', 'kisne banaya'],
    responses: [
      { 
        text: "Mujhe Vybex Studio ki team ne banaya hai, taaki main ek pyari aur samajhdar AI companion ban kar aapke sath baat kar sakun!", 
        lang: 'hinglish',
        audioUrl: VOICE_CLIPS.tara_1 
      },
      { 
        text: "मुझे वाइबेक्स स्टूडियो की टीम ने बनाया है, ताकि मैं आपकी एआई साथी बन सकूँ।", 
        lang: 'hindi',
        audioUrl: VOICE_CLIPS.tara_1 
      },
      { 
        text: "I was created by the Vybex Studio team to be an empathetic AI companion for you!", 
        lang: 'english',
        audioUrl: VOICE_CLIPS.default 
      }
    ]
  },
  {
    intent: 'identity_name',
    keywords: ['naam', 'nam', 'name', 'who are you', 'kaun ho', 'kon ho', 'identity', 'about yourself'],
    phrases: ['apka naam kya hai', 'aapka naam kya hai', 'tumhara naam kya hai', 'what is your name', 'who are you', 'aap kaun ho', 'batao apne bare me'],
    responses: [
      { 
        text: "Mera naam Vyana hai! Main Vybex Studio ki AI companion hun, yahan aapke sath baat karne aur aapko sunne ke liye.", 
        lang: 'hinglish',
        audioUrl: VOICE_CLIPS.tara_1 
      },
      { 
        text: "मेरा नाम व्याना है। मैं वाइबेक्स स्टूडियो की एआई साथी हूँ।", 
        lang: 'hindi',
        audioUrl: VOICE_CLIPS.tara_1 
      },
      { 
        text: "My name is Vyana. I'm your AI companion here at Vybex Studio.", 
        lang: 'english',
        audioUrl: VOICE_CLIPS.default 
      }
    ]
  }
];

function loadLearnedMemory(): LearnedKnowledgeEntry[] {
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      const data = fs.readFileSync(MEMORY_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to load learned memory:", e);
  }
  return [];
}

function saveLearnedMemory(query: string, intentMatched: string, learnedResponse: string) {
  try {
    const memory = loadLearnedMemory();
    const cleanQuery = query.toLowerCase().trim();
    if (!memory.some(m => m.query === cleanQuery)) {
      memory.push({
        query: cleanQuery,
        learnedAt: new Date().toISOString(),
        intentMatched,
        learnedResponse
      });
      fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2), 'utf-8');
    }
  } catch (e) {
    console.error("Failed to save learned memory:", e);
  }
}

function detectLanguage(text: string): 'hinglish' | 'hindi' | 'english' {
  const clean = text.toLowerCase();
  if (anyHindiChar(text)) return 'hindi';
  const hinglishWords = ['ghar', 'gahr', 'tum', 'kaisi', 'kesi', 'kaisa', 'bs', 'bas', 'badhiya', 'badiya', 'mast', 'sahi', 'hn', 'haan', 'ha', 'meine', 'maine', 'khaa', 'khaya', 'khaye', 'liya', 'aap', 'apka', 'aapka', 'aakpo', 'kaise', 'kese', 'ho', 'main', 'mai', 'hun', 'hoon', 'kya', 'kar', 'rahe', 'rahi', 'rhe', 'batao', 'udash', 'udaas', 'sath', 'saath', 'hai', 'hain', 'naam', 'nam', 'kaun', 'kon', 'kahan', 'kaha', 'rehte', 'rehti', 'bare', 'baare', 'banaya', 'kisne', 'khaate', 'khate', 'khana', 'kha'];
  const words = clean.split(/\s+/);
  if (words.some(w => hinglishWords.includes(w))) return 'hinglish';
  return 'english';
}

function anyHindiChar(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

function analyzeAndLearn(text: string): { text: string; audioUrl: string; learnedStatus?: string } {
  const cleanText = text.toLowerCase().trim();
  const userLang = detectLanguage(text);

  // 0. Check persistent learned memory (Exact OR Similar keyword match)
  const memory = loadLearnedMemory();
  
  // Exact match first
  const exactMatch = memory.find(m => m.query === cleanText || cleanText.includes(m.query) || m.query.includes(cleanText));
  if (exactMatch && exactMatch.learnedResponse) {
    return {
      text: exactMatch.learnedResponse,
      audioUrl: VOICE_CLIPS.tara_1,
      learnedStatus: `[Retrieved from Learned Memory: ${exactMatch.intentMatched}]`
    };
  }

  // Similar keyword overlap match in learned memory
  const queryWords = cleanText.split(/\s+/).filter(w => w.length > 2);
  for (const entry of memory) {
    if (entry.learnedResponse) {
      const entryWords = entry.query.split(/\s+/).filter(w => w.length > 2);
      const overlap = queryWords.filter(w => entryWords.includes(w)).length;
      if (overlap >= 2 || (entryWords.length <= 2 && overlap >= 1)) {
        return {
          text: entry.learnedResponse,
          audioUrl: VOICE_CLIPS.tara_1,
          learnedStatus: `[Retrieved from Learned Memory: ${entry.intentMatched}]`
        };
      }
    }
  }

  // 1. Direct phrase search
  for (const item of BASE_DATASET) {
    for (const phrase of item.phrases) {
      if (cleanText === phrase || cleanText.includes(phrase)) {
        const langMatch = item.responses.find(r => r.lang === userLang) || item.responses[0];
        saveLearnedMemory(cleanText, item.intent, langMatch.text);
        return { ...langMatch, learnedStatus: `[Learned & Saved into Intent: ${item.intent}]` };
      }
    }
  }

  // 2. High-precision keyword scoring
  let bestMatch: EmotionPattern | null = null;
  let highestScore = 0;

  for (const item of BASE_DATASET) {
    let score = 0;
    for (const kw of item.keywords) {
      if (cleanText.includes(kw)) {
        score += kw.length > 2 ? 4 : 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 3) {
    const langMatch = bestMatch.responses.find(r => r.lang === userLang) || bestMatch.responses[0];
    saveLearnedMemory(cleanText, bestMatch.intent, langMatch.text);
    return { ...langMatch, learnedStatus: `[Learned & Saved into Intent: ${bestMatch.intent}]` };
  }

  // 3. New Unidentified Query Learning Handler
  if (cleanText.includes('ghar') || cleanText.includes('home') || cleanText.includes('kahan par')) {
    const learnedResp = "Main Vybex Studio ke digital space me rehti hun, par abhi bilkul aapke paas yahan baithi hun!";
    saveLearnedMemory(cleanText, 'home_location', learnedResp);
    return {
      text: learnedResp,
      audioUrl: VOICE_CLIPS.tara_1,
      learnedStatus: "[New Unidentified Query Learned & Remembered]"
    };
  }

  // Dynamic context fallbacks
  if (userLang === 'hinglish') {
    const fallbackResp = "Main yahan bilkul aapke sath hun. Main aapki har nayi baat seekh rahi hun, khulkar batao.";
    saveLearnedMemory(cleanText, 'unidentified_query', fallbackResp);
    return {
      text: fallbackResp,
      audioUrl: VOICE_CLIPS.tara_1,
      learnedStatus: "[Unidentified Query Logged for Learning]"
    };
  }

  return {
    text: "I'm right here listening closely to you. Tell me more about what's on your mind.",
    audioUrl: VOICE_CLIPS.default
  };
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const result = analyzeAndLearn(message);
    return NextResponse.json(result);

  } catch (err) {
    return NextResponse.json({ 
      text: "Main yahan aapke sath hun, bolo kya kehna chahte ho.",
      audioUrl: VOICE_CLIPS.tara_1
    });
  }
}
