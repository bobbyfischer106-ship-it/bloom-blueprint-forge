import { motion } from "framer-motion";
import { Clock, Plus, X } from "lucide-react";
import { useState } from "react";

interface TimeBlock {
  id: string;
  time: string;
  title: string;
  category: "study" | "health" | "personal" | "break";
}

const categoryStyles = {
  study: "border-l-primary bg-primary/5",
  health: "border-l-success bg-success/5",
  personal: "border-l-info bg-info/5",
  break: "border-l-muted-foreground bg-muted/30",
};

const categoryLabels = {
  study: "Study",
  health: "Health",
  personal: "Personal",
  break: "Break",
};

const initialBlocks: TimeBlock[] = [
  { id: "1", time: "06:00", title: "Morning workout", category: "health" },
  { id: "2", time: "07:00", title: "Breakfast & prepare", category: "personal" },
  { id: "3", time: "08:00", title: "Mathematics study", category: "study" },
  { id: "4", time: "09:30", title: "Short break", category: "break" },
  { id: "5", time: "10:00", title: "Physics revision", category: "study" },
  { id: "6", time: "12:00", title: "Lunch break", category: "break" },
  { id: "7", time: "13:00", title: "Computer Science project", category: "study" },
  { id: "8", time: "15:00", title: "Reading / Discovery", category: "personal" },
  { id: "9", time: "16:00", title: "Evening exercise", category: "health" },
  { id: "10", time: "17:30", title: "Review & plan tomorrow", category: "study" },
];

export default function Schedule() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [adding, setAdding] = useState(false);
  const [newBlock, setNewBlock] = useState({ time: "", title: "", category: "study" as TimeBlock["category"] });

  const addBlock = () => {
    if (!newBlock.time || !newBlock.title) return;
    const block: TimeBlock = { id: Date.now().toString(), ...newBlock };
    setBlocks((prev) => [...prev, block].sort((a, b) => a.time.localeCompare(b.time)));
    setNewBlock({ time: "", title: "", category: "study" });
    setAdding(false);
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Daily Schedule</h1>
          <p className="text-muted-foreground mt-1">Discipline is the bridge between goals and accomplishment.</p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </motion.div>

      {adding && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="time"
              value={newBlock.time}
              onChange={(e) => setNewBlock((p) => ({ ...p, time: e.target.value }))}
              className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            />
            <input
              type="text"
              placeholder="What's the plan?"
              value={newBlock.title}
              onChange={(e) => setNewBlock((p) => ({ ...p, title: e.target.value }))}
              className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            />
            <select
              value={newBlock.category}
              onChange={(e) => setNewBlock((p) => ({ ...p, category: e.target.value as TimeBlock["category"] }))}
              className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            >
              {Object.entries(categoryLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <button onClick={addBlock} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Add to Schedule
          </button>
        </motion.div>
      )}

      <div className="space-y-3">
        {blocks.map((block, i) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-4 border-l-4 ${categoryStyles[block.category]} flex items-center justify-between group`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium font-display min-w-[3.5rem]">{block.time}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{block.title}</p>
                <span className="text-xs text-muted-foreground">{categoryLabels[block.category]}</span>
              </div>
            </div>
            <button
              onClick={() => removeBlock(block.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
