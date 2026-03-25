import { motion } from "framer-motion";
import { Flame, Plus, Check, X, RotateCcw } from "lucide-react";
import { useState, useMemo } from "react";

interface Habit {
  id: string;
  name: string;
  icon: string;
  category: "study" | "health" | "personal";
  completedDates: string[];
}

const categoryColors: Record<string, string> = {
  study: "bg-primary",
  health: "bg-success",
  personal: "bg-info",
};

const categoryLabels: Record<string, string> = {
  study: "Study",
  health: "Health",
  personal: "Personal",
};

const getToday = () => new Date().toISOString().split("T")[0];

const getLast28Days = () => {
  const days: string[] = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

const getStreak = (dates: string[]): number => {
  const sorted = [...dates].sort().reverse();
  const today = getToday();
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    if (sorted.includes(dateStr)) streak++;
    else if (i > 0) break;
    else if (dateStr === today) continue;
    else break;
  }
  return streak;
};

const defaultHabits: Habit[] = [
  { id: "1", name: "Read 30 minutes", icon: "📖", category: "personal", completedDates: (() => {
    const dates: string[] = [];
    for (let i = 1; i <= 5; i++) { const d = new Date(); d.setDate(d.getDate() - i); dates.push(d.toISOString().split("T")[0]); }
    return dates;
  })() },
  { id: "2", name: "Exercise", icon: "💪", category: "health", completedDates: (() => {
    const dates: string[] = [];
    for (let i = 0; i <= 3; i++) { const d = new Date(); d.setDate(d.getDate() - i); dates.push(d.toISOString().split("T")[0]); }
    return dates;
  })() },
  { id: "3", name: "Solve 5 math problems", icon: "🧮", category: "study", completedDates: (() => {
    const dates: string[] = [];
    for (let i = 1; i <= 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); dates.push(d.toISOString().split("T")[0]); }
    return dates;
  })() },
  { id: "4", name: "Drink 8 glasses of water", icon: "💧", category: "health", completedDates: (() => {
    const dates: string[] = [];
    for (let i = 0; i <= 2; i++) { const d = new Date(); d.setDate(d.getDate() - i); dates.push(d.toISOString().split("T")[0]); }
    return dates;
  })() },
  { id: "5", name: "Revise notes", icon: "📝", category: "study", completedDates: (() => {
    const dates: string[] = [];
    for (let i = 0; i <= 4; i++) { const d = new Date(); d.setDate(d.getDate() - i * 2); dates.push(d.toISOString().split("T")[0]); }
    return dates;
  })() },
  { id: "6", name: "Practice coding", icon: "💻", category: "study", completedDates: [] },
];

const PRESET_HABITS = [
  { name: "Meditate 10 min", icon: "🧘", category: "personal" as const },
  { name: "Journal", icon: "✍️", category: "personal" as const },
  { name: "Sleep by 11 PM", icon: "🌙", category: "health" as const },
  { name: "No phone 1st hour", icon: "📵", category: "personal" as const },
];

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [adding, setAdding] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", icon: "✅", category: "study" as Habit["category"] });
  const today = getToday();
  const last28 = useMemo(() => getLast28Days(), []);

  const toggleToday = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const has = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: has
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  };

  const addHabit = () => {
    if (!newHabit.name) return;
    setHabits((prev) => [...prev, { id: Date.now().toString(), completedDates: [], ...newHabit }]);
    setNewHabit({ name: "", icon: "✅", category: "study" });
    setAdding(false);
  };

  const addPreset = (preset: { name: string; icon: string; category: Habit["category"] }) => {
    if (habits.some((h) => h.name === preset.name)) return;
    setHabits((prev) => [...prev, { id: Date.now().toString(), completedDates: [], ...preset }]);
  };

  const removeHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;
  const bestStreak = Math.max(...habits.map((h) => getStreak(h.completedDates)), 0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Habit Tracker</h1>
          <p className="text-muted-foreground text-sm mt-1">Small daily actions compound into extraordinary results.</p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground">{completedToday}/{habits.length}</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Done Today</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground">{bestStreak}🔥</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Best Streak</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground">
            {habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0}%
          </p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Today's Rate</p>
        </div>
      </motion.div>

      {/* Add Form */}
      {adding && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-5 space-y-4">
          <div className="grid grid-cols-[3rem_1fr_auto] gap-3">
            <input
              type="text"
              value={newHabit.icon}
              onChange={(e) => setNewHabit((p) => ({ ...p, icon: e.target.value }))}
              className="bg-muted border border-border rounded-lg px-2 py-2 text-center text-lg"
              maxLength={2}
            />
            <input
              type="text"
              placeholder="Habit name..."
              value={newHabit.name}
              onChange={(e) => setNewHabit((p) => ({ ...p, name: e.target.value }))}
              className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            />
            <select
              value={newHabit.category}
              onChange={(e) => setNewHabit((p) => ({ ...p, category: e.target.value as Habit["category"] }))}
              className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            >
              {Object.entries(categoryLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <button onClick={addHabit} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Add Habit
          </button>
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_HABITS.filter((p) => !habits.some((h) => h.name === p.name)).map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => addPreset(preset)}
                  className="text-xs bg-muted/70 text-muted-foreground px-2.5 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {preset.icon} {preset.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Habits List with Streak Grid */}
      <div className="space-y-4">
        {habits.map((habit, i) => {
          const streak = getStreak(habit.completedDates);
          const doneToday = habit.completedDates.includes(today);

          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-4 group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleToday(habit.id)}
                    className={`h-9 w-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                      doneToday
                        ? "bg-success/20 ring-2 ring-success/40 scale-105"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    {doneToday ? <Check className="h-5 w-5 text-success" /> : <span>{habit.icon}</span>}
                  </button>
                  <div>
                    <p className={`text-sm font-medium ${doneToday ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {habit.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{categoryLabels[habit.category]}</span>
                      {streak > 0 && (
                        <span className="flex items-center gap-0.5 text-xs text-primary font-medium">
                          <Flame className="h-3 w-3" /> {streak} day{streak > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeHabit(habit.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Streak Grid — last 28 days */}
              <div className="flex gap-[3px] flex-wrap">
                {last28.map((date) => {
                  const done = habit.completedDates.includes(date);
                  const isToday = date === today;
                  const dayLabel = new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

                  return (
                    <div
                      key={date}
                      title={`${dayLabel}${done ? " ✓" : ""}`}
                      className={`h-3.5 w-3.5 rounded-sm transition-colors ${
                        done
                          ? `${categoryColors[habit.category]} opacity-90`
                          : isToday
                          ? "bg-muted ring-1 ring-primary/30"
                          : "bg-muted/40"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Mini labels */}
              <div className="flex justify-between mt-1.5">
                <span className="text-[0.55rem] text-muted-foreground">4 weeks ago</span>
                <span className="text-[0.55rem] text-muted-foreground">Today</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {habits.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center">
          <Flame className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No habits yet. Tap + to start building your streaks.</p>
        </motion.div>
      )}
    </div>
  );
}
