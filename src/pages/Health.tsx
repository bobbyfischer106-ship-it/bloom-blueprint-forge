import { motion } from "framer-motion";
import { Droplets, Moon, Dumbbell, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { StatCard } from "@/components/StatCard";

interface TrackerItem {
  label: string;
  value: number;
  max: number;
  unit: string;
}

export default function Health() {
  const [water, setWater] = useState(4);
  const [sleep, setSleep] = useState(7);
  const [exercise, setExercise] = useState(30);

  const trackers: (TrackerItem & { icon: any; color: "primary" | "success" | "info" })[] = [
    { label: "Water", value: water, max: 8, unit: "glasses", icon: Droplets, color: "info" },
    { label: "Sleep", value: sleep, max: 10, unit: "hours", icon: Moon, color: "primary" },
    { label: "Exercise", value: exercise, max: 120, unit: "min", icon: Dumbbell, color: "success" },
  ];

  const setters = [setWater, setSleep, setExercise];
  const steps = [1, 0.5, 15];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Health Tracker</h1>
        <p className="text-muted-foreground mt-1">Take care of your body — it's the only place you have to live.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trackers.map((t, i) => (
          <StatCard key={t.label} title={t.label} value={`${t.value} ${t.unit}`} subtitle={`Goal: ${t.max} ${t.unit}`} icon={t.icon} color={t.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trackers.map((t, i) => {
          const pct = Math.min((t.value / t.max) * 100, 100);
          return (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground">{t.label}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setters[i](Math.max(0, t.value - steps[i]))}
                    className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-display font-bold text-lg text-foreground min-w-[3rem] text-center">
                    {t.value}
                  </span>
                  <button
                    onClick={() => setters[i](Math.min(t.max * 1.5, t.value + steps[i]))}
                    className="p-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{Math.round(pct)}% of daily goal</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Daily Tips</h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>Drink a glass of water first thing in the morning</li>
          <li className="flex items-start gap-2"><span className="text-success mt-0.5">•</span>Take a 10-minute walk between study sessions</li>
          <li className="flex items-start gap-2"><span className="text-info mt-0.5">•</span>Aim for 7-9 hours of sleep for peak cognitive performance</li>
        </ul>
      </motion.div>
    </div>
  );
}
