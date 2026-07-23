'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, MicOff, Send, Sparkles, Volume2, VolumeX, Shield, Circle } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'vyana' | 'user';
  text: string;
  timestamp: string;
}

export default function VyanaTalkPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'vyana',
      text: "Hey there... I'm Vyana. I'm right here with you. Feel free to share anything on your mind, I'm listening.",
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const speakText = async (text: string) => {
    if (!audioEnabled) return;
    
    // Stop any existing playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    try {
      // Try ElevenLabs audio API first
      const res = await fetch('/api/vyana-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.playbackRate = 1.25;
        currentAudioRef.current = audio;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);

        await audio.play();
        return;
      } else {
        console.warn("ElevenLabs returned status", res.status, "- falling back to clear local TTS voice.");
      }
    } catch (e) {
      console.log("ElevenLabs fallback to browser TTS", e);
    }

    // High quality local female TTS Voice fallback
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.25; // 1.25x natural human conversational speed
    utterance.pitch = 1.2;
    
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('female') ||
        (v.name.toLowerCase().includes('google') && !v.name.toLowerCase().includes('male'))
      )
    ) || voices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('david') && !v.name.toLowerCase().includes('mark') && !v.name.toLowerCase().includes('george'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/vyana-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsgText }),
      });

      const data = await res.json();
      const vyanaResponse = data.response || data.text || "I am right here with you, tell me more.";
      const learnedBadge = data.learnedStatus ? ` ${data.learnedStatus}` : '';

      const vyanaMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'vyana',
        text: vyanaResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + (data.learnedStatus ? ` • ${data.learnedStatus}` : '')
      };

      setMessages(prev => [...prev, vyanaMsg]);

      if (audioEnabled) {
        try {
          const ttsRes = await fetch('/api/vyana-tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: vyanaResponse }),
          });
          const ttsData = await ttsRes.json();
          if (ttsData.audioUrl) {
            if (currentAudioRef.current) {
              currentAudioRef.current.pause();
            }
            const audio = new Audio(ttsData.audioUrl);
            audio.playbackRate = 1.25; // 1.25x faster natural conversational pace
            currentAudioRef.current = audio;
            audio.onplay = () => setIsSpeaking(true);
            audio.onended = () => setIsSpeaking(false);
            audio.onerror = () => speakText(vyanaResponse);
            await audio.play();
            return;
          }
        } catch (e) {
          console.error("Local TTS fetch error:", e);
        }
        speakText(vyanaResponse);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className="relative min-h-screen bg-[#030504] text-white flex flex-col justify-between overflow-hidden">
      {/* Background glowing ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#030504] to-transparent z-10" />
      </div>

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Vybex
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium">
            <Shield className="w-3.5 h-3.5" /> 1-on-1 Private Session
          </div>

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/5"
            title={audioEnabled ? "Voice Output On" : "Voice Output Muted"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-green-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>
        </div>
      </header>

      {/* Center 1-on-1 Sitting Experience */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 py-6">
        
        {/* Left/Top: Vyana Interactive Visual Avatar */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            
            {/* Pulsing Aura Rings when Vyana is speaking/listening */}
            <div className={`absolute inset-0 rounded-full border border-green-500/20 transition-all duration-700 ${isSpeaking || isLoading ? 'scale-110 opacity-100 animate-ping' : 'scale-95 opacity-20'}`} />
            <div className={`absolute inset-4 rounded-full bg-gradient-to-b from-green-500/15 to-transparent blur-2xl transition-all duration-500 ${isSpeaking ? 'opacity-100 scale-105' : 'opacity-40 scale-95'}`} />

            {/* Vyana Main Cutout Image */}
            <img 
              src="/vybex-ai-avatar.png" 
              alt="Vyana" 
              className="object-contain w-full h-full scale-[1.9] pointer-events-none drop-shadow-[0_0_35px_rgba(34,197,94,0.2)] z-10"
              onError={(e) => {
                if (!e.currentTarget.src.includes('IMG_20260720_225204.png')) {
                  e.currentTarget.src = '/IMG_20260720_225204.png';
                }
              }}
            />

            {/* Chest Glow Orb */}
            <div className={`absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-green-400 blur-md mix-blend-screen pointer-events-none transition-all duration-300 z-20 ${isSpeaking ? 'opacity-90 scale-125' : isLoading ? 'opacity-60 animate-pulse' : 'opacity-40 scale-90'}`} />
          </div>

          <div className="mt-4 text-center">
            <h2 className="text-xl font-light text-white flex items-center justify-center gap-2">
              Vyana <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-light">
              {isSpeaking ? 'Speaking to you...' : isLoading ? 'Listening & thinking...' : 'Here with you • Private space'}
            </p>
          </div>
        </div>

        {/* Right/Bottom: Private Chat Stream */}
        <div className="w-full md:w-1/2 h-[450px] md:h-[520px] flex flex-col bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl p-5 shadow-2xl relative">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-green-400" /> Private Conversation</span>
            <span>End-to-End Encrypted Session</span>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 custom-scrollbar">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-green-500 text-black font-medium rounded-br-none shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                      : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5 backdrop-blur-md'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-green-400/80">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                Vyana is formulating a response...
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input & Voice Controls */}
          <form onSubmit={handleSend} className="pt-3 border-t border-white/5 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-3 rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
              title="Speak to Vyana"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share anything with Vyana..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-green-500 hover:bg-green-400 disabled:opacity-40 text-black font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </main>
    </div>
  );
}
