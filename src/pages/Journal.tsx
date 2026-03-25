import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, ChevronLeft, ChevronRight, Sparkles, Save, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  learned: string;
  improved: string;
  gratitude: string;
  freeWrite: string;
}

const MOODS = [
  { emoji: "🔥", label: "On fire" },
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Tough" },
  { emoji: "😤", label: "Frustrated" },
];

const PROMPTS = [
  "What's one thing you understood deeply today?",
  "What mistake taught you the most today?",
  "How did you push past a challenge today?",
  "What would you do differently if you could redo today?",
  "What are you most proud of today?",
  "What skill got sharper today?",
  "What surprised you about today?",
  "How did you move closer to your goals?",
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
};

const getToday = () => new Date().toISOString().split("T")[0];

const sampleEntries: JournalEntry[] = [
  {
    id: "s1",
    date: (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split("T")[0]; })(),
    mood: "😊",
    learned: "Understood integration by parts much better after solving 10 problems. The pattern finally clicked.",
    improved: "Got faster at solving quadratic equations. Shaved 2 minutes off my average time.",
    gratitude: "Grateful for my coaching teacher who explained the concept a second time patiently.",
    freeWrite: "Today was productive. I felt like things are starting to connect in physics and math. Need to keep this momentum going.",
  },
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [writing, setWriting] = useState(false);
  const [viewing, setViewing] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const [draft, setDraft] = useState<Omit<JournalEntry, "id">>({
    date: getToday(),
    mood: "",
    learned: "",
    improved: "",
    gratitude: "",
    freeWrite: "",
  });

  const todayEntry = entries.find((e) => e.date === getToday());
  const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  const shufflePrompt = () => {
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  };

  const saveEntry = () => {
    if (!draft.mood && !draft.learned && !draft.freeWrite) return;
    const entry: JournalEntry = { id: Date.now().toString(), ...draft };
    setEntries((prev) => {
      const filtered = prev.filter((e) => e.date !== draft.date);
      return [...filtered, entry];
    });
    setWriting(false);
    setDraft({ date: getToday(), mood: "", learned: "", improved: "", gratitude: "", freeWrite: "" });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setViewing(null);
  };

  const viewedEntry = entries.find((e) => e.id === viewing);
  const streak = (() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      if (entries.some((e) => e.date === dateStr)) count++;
      else if (i > 0) break;
    }
    return count;
  })();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Daily Journal</h1>
          <p className="text-muted-foreground text-sm mt-1">Reflect. Learn. Grow.</p>
        </div>
        {!writing && (
          <button
            onClick={() => { setWriting(true); setViewing(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm font-medium"
          >
            <Edit3 className="h-4 w-4" />
            {todayEntry ? "Edit Today" : "Write"}
          </button>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground">{entries.length}</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Entries</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground">{streak}🔥</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Streak</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground">{todayEntry ? "✅" : "⏳"}</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Today</p>
        </div>
      </motion.div>

      {/* Writing Mode */}
      <AnimatePresence mode="wait">
        {writing && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6 space-y-5"
          >
            {/* Prompt */}
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4">
              <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{prompt}</p>
                <button onClick={shufflePrompt} className="text-xs text-primary/70 hover:text-primary mt-1 transition-colors">
                  Another prompt →
                </button>
              </div>
            </div>

            {/* Mood */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">How was your day?</label>
              <div className="flex gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.emoji}
                    onClick={() => setDraft((p) => ({ ...p, mood: m.emoji }))}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                      draft.mood === m.emoji
                        ? "bg-primary/15 ring-2 ring-primary/30 scale-110"
                        : "bg-muted/40 hover:bg-muted/70"
                    }`}
                  >
                    <span className="text-xl">{m.emoji}</span>
                    <span className="text-[0.6rem] text-muted-foreground">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* What I Learned */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                What I learned today
              </label>
              <textarea
                value={draft.learned}
                onChange={(e) => setDraft((p) => ({ ...p, learned: e.target.value }))}
                placeholder="A concept, insight, or realization..."
                rows={3}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* How I Improved */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                How I improved
              </label>
              <textarea
                value={draft.improved}
                onChange={(e) => setDraft((p) => ({ ...p, improved: e.target.value }))}
                placeholder="Skills sharpened, habits built, progress made..."
                rows={2}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Gratitude */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Gratitude
              </label>
              <textarea
                value={draft.gratitude}
                onChange={(e) => setDraft((p) => ({ ...p, gratitude: e.target.value }))}
                placeholder="Something or someone you're thankful for..."
                rows={2}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Free Write */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Free thoughts
              </label>
              <textarea
                value={draft.freeWrite}
                onChange={(e) => setDraft((p) => ({ ...p, freeWrite: e.target.value }))}
                placeholder="Anything else on your mind..."
                rows={4}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={saveEntry}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Save className="h-4 w-4" />
                Save Entry
              </button>
              <button
                onClick={() => setWriting(false)}
                className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* View Entry */}
        {!writing && viewedEntry && (
          <motion.div
            key="view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-display font-bold text-foreground">{formatDate(viewedEntry.date)}</p>
                <span className="text-2xl">{viewedEntry.mood}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewing(null)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => deleteEntry(viewedEntry.id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {viewedEntry.learned && (
              <div>
                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">What I Learned</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{viewedEntry.learned}</p>
              </div>
            )}
            {viewedEntry.improved && (
              <div>
                <p className="text-xs font-medium text-success uppercase tracking-wider mb-1">How I Improved</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{viewedEntry.improved}</p>
              </div>
            )}
            {viewedEntry.gratitude && (
              <div>
                <p className="text-xs font-medium text-info uppercase tracking-wider mb-1">Gratitude</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{viewedEntry.gratitude}</p>
              </div>
            )}
            {viewedEntry.freeWrite && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Free Thoughts</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{viewedEntry.freeWrite}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past Entries */}
      {!writing && !viewedEntry && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Past Entries</p>
          {sortedEntries.length === 0 && (
            <div className="glass-card p-8 text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No entries yet. Start writing your first reflection.</p>
            </div>
          )}
          {sortedEntries.map((entry, i) => (
            <motion.button
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setViewing(entry.id)}
              className="w-full glass-card p-4 text-left hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{entry.mood}</span>
                  <p className="text-sm font-medium text-foreground font-display">{formatDate(entry.date)}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {entry.learned || entry.freeWrite || entry.improved}
              </p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
