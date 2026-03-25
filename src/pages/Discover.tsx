import { motion } from "framer-motion";
import { Lightbulb, ExternalLink, RefreshCw } from "lucide-react";
import { useState, useCallback } from "react";

interface Nugget {
  title: string;
  content: string;
  category: string;
  source?: string;
}

const allNuggets: Nugget[] = [
  { title: "The Feynman Technique", content: "To truly understand something, try explaining it in simple terms. If you can't, you don't understand it well enough. This method was used by Nobel Prize-winning physicist Richard Feynman.", category: "Learning" },
  { title: "Neuroplasticity", content: "Your brain can literally rewire itself. Every time you learn something new, neural pathways strengthen. This means intelligence isn't fixed — it grows with effort.", category: "Science" },
  { title: "The 80/20 Rule", content: "In most subjects, 20% of the concepts yield 80% of the understanding. Identify and master the core principles first, then branch out.", category: "Productivity" },
  { title: "Compound Interest of Learning", content: "Warren Buffett reads 500 pages a day. He says knowledge builds up like compound interest — the earlier you start, the more you'll have later.", category: "Wisdom" },
  { title: "Memory Palaces", content: "Ancient Romans memorized entire speeches using spatial memory. You can too — associate information with locations in a familiar building.", category: "Learning" },
  { title: "The Zeigarnik Effect", content: "Unfinished tasks stick in your memory more than completed ones. Use this: start studying a topic before bed and your brain will process it overnight.", category: "Psychology" },
  { title: "Elon Musk's First Principles", content: "Don't reason by analogy. Break problems down to their fundamental truths and build up from there. This is how SpaceX reduced rocket costs by 10x.", category: "Thinking" },
  { title: "The Dunning-Kruger Effect", content: "Beginners often overestimate their knowledge. Experts tend to underestimate theirs. Stay humble, keep questioning, and seek feedback.", category: "Psychology" },
  { title: "Spaced Repetition", content: "Review material at increasing intervals — 1 day, 3 days, 7 days, 21 days. This is the most scientifically proven method for long-term retention.", category: "Learning" },
  { title: "The Adjacent Possible", content: "Innovation happens at the edges of what you know. Read widely across different fields — the best ideas come from unexpected connections.", category: "Innovation" },
  { title: "Flow State", content: "Peak performance happens when challenge slightly exceeds skill. Mihaly Csikszentmihalyi found that flow produces 5x more productivity and creativity.", category: "Performance" },
  { title: "The Power of Sleep", content: "During deep sleep, your brain replays and consolidates what you learned during the day. Students who sleep well after studying score 20-30% higher.", category: "Health" },
];

export default function Discover() {
  const [displayed, setDisplayed] = useState(allNuggets.slice(0, 6));

  const shuffle = useCallback(() => {
    const shuffled = [...allNuggets].sort(() => Math.random() - 0.5);
    setDisplayed(shuffled.slice(0, 6));
  }, []);

  const categoryColors: Record<string, string> = {
    Learning: "bg-primary/10 text-primary",
    Science: "bg-info/10 text-info",
    Productivity: "bg-success/10 text-success",
    Wisdom: "bg-primary/10 text-primary",
    Psychology: "bg-info/10 text-info",
    Thinking: "bg-success/10 text-success",
    Innovation: "bg-primary/10 text-primary",
    Performance: "bg-success/10 text-success",
    Health: "bg-info/10 text-info",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Discover</h1>
          <p className="text-muted-foreground mt-1">The mind that opens to a new idea never returns to its original size.</p>
        </div>
        <button onClick={shuffle} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm font-medium">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayed.map((nugget, i) => (
          <motion.div
            key={nugget.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5 space-y-3 hover:glow-amber transition-shadow duration-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground text-sm">{nugget.title}</h3>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[nugget.category] || "bg-muted text-muted-foreground"}`}>
                {nugget.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{nugget.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6 text-center">
        <p className="text-muted-foreground text-sm italic font-display">
          "An investment in knowledge pays the best interest." — Benjamin Franklin
        </p>
      </motion.div>
    </div>
  );
}
