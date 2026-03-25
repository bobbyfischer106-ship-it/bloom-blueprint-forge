import { motion, AnimatePresence } from "framer-motion";
import { Target, Plus, Check, Trash2, Flame, TrendingUp, RotateCcw } from "lucide-react";
import { useState } from "react";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  category: "study" | "health" | "personal";
}

const categoryStyles: Record<string, string> = {
  study: "border-l-primary",
  health: "border-l-success",
  personal: "border-l-info",
};

const categoryLabels: Record<string, string> = {
  study: "Study",
  health: "Health",
  personal: "Personal",
};

const presets: Omit<Goal, "id" | "current">[] = [
  { title: "Complete math problems", target: 50, unit: "problems", category: "study" },
  { title: "Run this week", target: 3, unit: "times", category: "health" },
  { title: "Read pages", target: 100, unit: "pages", category: "personal" },
  { title: "Solve physics numericals", target: 30, unit: "problems", category: "study" },
  { title: "Drink water daily", target: 7, unit: "days", category: "health" },
  { title: "Practice coding challenges", target: 10, unit: "challenges", category: "study" },
  { title: "Sleep 7+ hours", target: 7, unit: "days", category: "health" },
  { title: "Revise notes", target: 5, unit: "subjects", category: "study" },
];

const defaultGoals: Goal[] = [
  { id: "1", title: "Complete math problems", target: 50, current: 12, unit: "problems", category: "study" },
  { id: "2", title: "Run this week", target: 3, current: 1, unit: "times", category: "health" },
  { id: "3", title: "Read pages", target: 100, current: 35, unit: "pages", category: "personal" },
  { id: "4", title: "Solve physics numericals", target: 30, current: 8, unit: "problems", category: "study" },
  { id: "5", title: "Practice coding challenges", target: 10, current: 3, unit: "challenges", category: "study" },
];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [adding, setAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", target: 10, unit: "times", category: "study" as Goal["category"] });

  const addGoal = () => {
    if (!newGoal.title || newGoal.target <= 0) return;
    setGoals((prev) => [...prev, { id: Date.now().toString(), current: 0, ...newGoal }]);
    setNewGoal({ title: "", target: 10, unit: "times", category: "study" });
    setAdding(false);
  };

  const addPreset = (preset: Omit<Goal, "id" | "current">) => {
    if (goals.some((g) => g.title === preset.title)) return;
    setGoals((prev) => [...prev, { id: Date.now().toString(), current: 0, ...preset }]);
  };

  const increment = (id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, current: Math.max(0, Math.min(g.target, g.current + amount)) } : g))
    );
  };

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const resetAll = () => {
    setGoals((prev) => prev.map((g) => ({ ...g, current: 0 })));
  };

  const completed = goals.filter((g) => g.current >= g.target).length;
  const totalProgress = goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + Math.min(g.current / g.target, 1), 0) / goals.length * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Weekly Goals</h1>
          <p className="text-muted-foreground text-sm mt-1">Set targets. Crush them. Repeat.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetAll}
            className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
            title="Reset week"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setAdding(!adding)}
            className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{goals.length}</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Goals Set</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{completed}</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Completed</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{totalProgress}%</p>
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Overall</p>
        </div>
      </motion.div>

      {/* Add Form */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5 space-y-4 overflow-hidden"
          >
            <p className="text-sm font-medium text-foreground font-display">New Goal</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="e.g. Complete math problems"
                value={newGoal.title}
                onChange={(e) => setNewGoal((p) => ({ ...p, title: e.target.value }))}
                className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground col-span-full"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  value={newGoal.target}
                  onChange={(e) => setNewGoal((p) => ({ ...p, target: parseInt(e.target.value) || 1 }))}
                  className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground w-20"
                />
                <input
                  type="text"
                  placeholder="unit (e.g. problems)"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal((p) => ({ ...p, unit: e.target.value }))}
                  className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground flex-1"
                />
              </div>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal((p) => ({ ...p, category: e.target.value as Goal["category"] }))}
                className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
              >
                {Object.entries(categoryLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <button onClick={addGoal} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Add Goal
            </button>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {presets
                  .filter((p) => !goals.some((g) => g.title === p.title))
                  .slice(0, 4)
                  .map((preset) => (
                    <button
                      key={preset.title}
                      onClick={() => addPreset(preset)}
                      className="text-xs bg-muted/70 text-muted-foreground px-2.5 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      + {preset.title} ({preset.target} {preset.unit})
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((goal, i) => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const done = goal.current >= goal.target;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass-card p-4 border-l-4 ${categoryStyles[goal.category]} group ${done ? "opacity-80" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {done && <Check className="h-4 w-4 text-success" />}
                  <div>
                    <p className={`text-sm font-medium ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {goal.title}
                    </p>
                    <span className="text-xs text-muted-foreground">{categoryLabels[goal.category]}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-display font-bold text-foreground">
                    {goal.current}/{goal.target}
                  </span>
                  <span className="text-[0.6rem] text-muted-foreground">{goal.unit}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`h-full rounded-full ${
                    done
                      ? "bg-success"
                      : pct > 60
                      ? "bg-primary"
                      : pct > 30
                      ? "bg-primary/70"
                      : "bg-primary/40"
                  }`}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {!done && (
                    <>
                      <button
                        onClick={() => increment(goal.id, 1)}
                        className="text-xs bg-primary/15 text-primary px-3 py-1 rounded-full hover:bg-primary/25 transition-colors font-medium"
                      >
                        +1
                      </button>
                      {goal.target >= 10 && (
                        <button
                          onClick={() => increment(goal.id, 5)}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                        >
                          +5
                        </button>
                      )}
                    </>
                  )}
                  {goal.current > 0 && (
                    <button
                      onClick={() => increment(goal.id, -1)}
                      className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full hover:bg-muted/80 transition-colors"
                    >
                      -1
                    </button>
                  )}
                </div>
                <button
                  onClick={() => removeGoal(goal.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center">
          <Target className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No goals yet. Tap + to set your first target.</p>
        </motion.div>
      )}
    </div>
  );
}
