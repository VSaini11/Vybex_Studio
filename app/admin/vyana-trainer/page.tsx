'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Save, CheckCircle, HelpCircle, RefreshCw } from 'lucide-react';

interface UnhandledEntry {
  query: string;
  learnedAt: string;
  intentMatched: string;
  learnedResponse: string;
}

export default function VyanaTrainerPage() {
  const [entries, setEntries] = useState<UnhandledEntry[]>([]);
  const [editingAnswers, setEditingAnswers] = useState<{ [key: string]: string }>({});
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/vyana-learn');
      const data = await res.json();
      if (data.unhandledQueries) {
        setEntries(data.unhandledQueries);
        const initialMap: { [key: string]: string } = {};
        data.unhandledQueries.forEach((item: UnhandledEntry) => {
          initialMap[item.query] = item.learnedResponse;
        });
        setEditingAnswers(initialMap);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleTeach = async (query: string) => {
    const responseText = editingAnswers[query];
    if (!responseText) return;

    try {
      const res = await fetch('/api/admin/vyana-learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, responseText })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg(`Saved answer for "${query}"!`);
        setTimeout(() => setStatusMsg(''), 3000);
        fetchQueries();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-green-400">
            <Sparkles className="w-6 h-6" /> Vyana Self-Learning Trainer
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Review questions asked by users and teach Vyana the exact answer she should speak!
          </p>
        </div>
        <button 
          onClick={fetchQueries}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-gray-300 transition-colors"
          title="Refresh List"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {statusMsg && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {statusMsg}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500 animate-pulse">Loading logged queries...</p>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <HelpCircle className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No user questions logged yet.</p>
          <p className="text-xs text-gray-600 mt-1">Go to /talk-to-vyana and ask any new question!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-green-400">User asked: "{item.query}"</span>
                <span className="text-[10px] text-gray-500">{new Date(item.learnedAt).toLocaleTimeString()}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-1">
                <input
                  type="text"
                  value={editingAnswers[item.query] || ''}
                  onChange={(e) => setEditingAnswers({ ...editingAnswers, [item.query]: e.target.value })}
                  placeholder="Type the exact answer Vyana should learn and speak..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50"
                />
                <button
                  onClick={() => handleTeach(item.query)}
                  className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap"
                >
                  <Save className="w-3.5 h-3.5" /> Teach Answer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
