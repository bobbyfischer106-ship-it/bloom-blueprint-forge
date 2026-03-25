import { motion } from "framer-motion";
import { Clock, Plus, X, School, BookOpen, GraduationCap, Dumbbell, Coffee, Sun, Moon } from "lucide-react";
import { useState } from "react";

interface TimeBlock {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  category: "school" | "tutor" | "coaching" | "study" | "health" | "personal" | "break";
  fixed?: boolean;
  days?: string[];
}

const categoryStyles: Record<string, string> = {
  school: "border-l-primary bg-primary/10",
  tutor: "border-l-info bg-info/10",
  coaching: "border-l-[hsl(var(--success))] bg-success/10",
  study: "border-l-primary bg-primary/5",
  health: "border-l-success bg-success/5",
  personal: "border-l-info bg-info/5",
  break: "border-l-muted-foreground bg-muted/30",
};

const categoryIcons: Record<string, React.ReactNode> = {
  school: <School className="h-4 w-4" />,
  tutor: <BookOpen className="h-4 w-4" />,
  coaching: <GraduationCap className="h-4 w-4" />,
  study: <BookOpen className="h-4 w-4" />,
  health: <Dumbbell className="h-4 w-4" />,
  personal: <Coffee className="h-4 w-4" />,
  break: <Sun className="h-4 w-4" />,
};

const categoryLabels: Record<string, string> = {
  school: "School",
  tutor: "Tutor",
  coaching: "Coaching",
  study: "Self Study",
  health: "Health",
  personal: "Personal",
  break: "Break",
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TUTOR_DAYS = ["Mon", "Wed", "Fri"];

const getFixedBlocks = (day: string): TimeBlock[] => {
  const blocks: TimeBlock[] = [
    { id: "f1", time: "05:30", endTime: "06:15", title: "Wake up & Morning routine", category: "personal", fixed: true },
    { id: "f2", time: "06:15", endTime: "06:50", title: "Morning workout / Exercise", category: "health", fixed: true },
    { id: "f3", time: "07:00", endTime: "14:00", title: "School", category: "school", fixed: true },
    { id: "f4", time: "14:00", endTime: "14:30", title: "Lunch & Rest", category: "break", fixed: true },
    { id: "f5", time: "14:30", endTime: "17:00", title: "Self study / Homework", category: "study", fixed: true },
  ];

  if (TUTOR_DAYS.includes(day)) {
    blocks.push(
      { id: "f6", time: "17:00", endTime: "17:30", title: "Snack break", category: "break", fixed: true },
      { id: "f7", time: "17:30", endTime: "19:00", title: "Tutor session", category: "tutor", fixed: true },
      { id: "f8", time: "19:00", endTime: "21:15", title: "Coaching class", category: "coaching", fixed: true },
      { id: "f9", time: "21:15", endTime: "21:45", title: "Dinner", category: "break", fixed: true },
      { id: "f10", time: "21:45", endTime: "22:30", title: "Revision & Quick review", category: "study", fixed: true },
      { id: "f11", time: "22:30", endTime: "23:00", title: "Wind down & Sleep", category: "personal", fixed: true },
    );
  } else if (day === "Sat" || day === "Sun") {
    blocks.splice(2, 1); // remove school on weekends
    blocks.splice(0, 0); // keep morning routine
    // Re-structure weekend
    const weekendBlocks: TimeBlock[] = [
      { id: "w1", time: "05:30", endTime: "06:15", title: "Wake up & Morning routine", category: "personal", fixed: true },
      { id: "w2", time: "06:15", endTime: "07:00", title: "Morning workout / Exercise", category: "health", fixed: true },
      { id: "w3", time: "07:00", endTime: "07:30", title: "Breakfast", category: "break", fixed: true },
      { id: "w4", time: "07:30", endTime: "10:00", title: "Deep study session", category: "study", fixed: true },
      { id: "w5", time: "10:00", endTime: "10:30", title: "Break", category: "break", fixed: true },
      { id: "w6", time: "10:30", endTime: "13:00", title: "Practice problems / Revision", category: "study", fixed: true },
      { id: "w7", time: "13:00", endTime: "14:00", title: "Lunch & Rest", category: "break", fixed: true },
      { id: "w8", time: "14:00", endTime: "16:30", title: "Self study / Projects", category: "study", fixed: true },
      { id: "w9", time: "16:30", endTime: "17:30", title: "Discovery & Learning", category: "personal", fixed: true },
      { id: "w10", time: "17:30", endTime: "18:30", title: "Exercise / Sports", category: "health", fixed: true },
      { id: "w11", time: "19:00", endTime: "21:15", title: "Coaching class", category: "coaching", fixed: true },
      { id: "w12", time: "21:15", endTime: "21:45", title: "Dinner", category: "break", fixed: true },
      { id: "w13", time: "21:45", endTime: "22:30", title: "Light reading / Reflection", category: "personal", fixed: true },
      { id: "w14", time: "22:30", endTime: "23:00", title: "Wind down & Sleep", category: "personal", fixed: true },
    ];
    return weekendBlocks;
  } else {
    // Non-tutor weekdays
    blocks.push(
      { id: "f6b", time: "17:00", endTime: "17:30", title: "Snack & Refresh", category: "break", fixed: true },
      { id: "f7b", time: "17:30", endTime: "19:00", title: "Extra self study / Practice", category: "study", fixed: true },
      { id: "f8b", time: "19:00", endTime: "21:15", title: "Coaching class", category: "coaching", fixed: true },
      { id: "f9b", time: "21:15", endTime: "21:45", title: "Dinner", category: "break", fixed: true },
      { id: "f10b", time: "21:45", endTime: "22:30", title: "Revision & Quick review", category: "study", fixed: true },
      { id: "f11b", time: "22:30", endTime: "23:00", title: "Wind down & Sleep", category: "personal", fixed: true },
    );
  }

  return blocks;
};

const getDayDate = (dayIndex: number) => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const date = new Date(today);
  date.setDate(today.getDate() + mondayOffset + dayIndex);
  return date;
};

const isToday = (dayIndex: number) => {
  const date = getDayDate(dayIndex);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export default function Schedule() {
  const todayIndex = (() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  })();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [customBlocks, setCustomBlocks] = useState<Record<number, TimeBlock[]>>({});
  const [adding, setAdding] = useState(false);
  const [newBlock, setNewBlock] = useState({ time: "", title: "", category: "study" as TimeBlock["category"] });

  const dayName = DAYS[selectedDay];
  const fixedBlocks = getFixedBlocks(dayName);
  const extraBlocks = customBlocks[selectedDay] || [];
  const allBlocks = [...fixedBlocks, ...extraBlocks].sort((a, b) => a.time.localeCompare(b.time));

  const addBlock = () => {
    if (!newBlock.time || !newBlock.title) return;
    const block: TimeBlock = { id: Date.now().toString(), ...newBlock };
    setCustomBlocks((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), block],
    }));
    setNewBlock({ time: "", title: "", category: "study" });
    setAdding(false);
  };

  const removeBlock = (id: string) => {
    setCustomBlocks((prev) => ({
      ...prev,
      [selectedDay]: (prev[selectedDay] || []).filter((b) => b.id !== id),
    }));
  };

  // Calculate study hours for the day
  const studyMinutes = allBlocks
    .filter((b) => ["study", "tutor", "coaching", "school"].includes(b.category))
    .reduce((sum, b) => {
      if (!b.endTime) return sum + 60;
      const [sh, sm] = b.time.split(":").map(Number);
      const [eh, em] = b.endTime.split(":").map(Number);
      return sum + (eh * 60 + em) - (sh * 60 + sm);
    }, 0);

  const isTutorDay = TUTOR_DAYS.includes(dayName);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-foreground">My Schedule</h1>
        <p className="text-muted-foreground text-sm">Discipline is the bridge between goals and accomplishment.</p>
      </motion.div>

      {/* Day Selector */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 overflow-x-auto pb-2">
        {DAYS.map((day, i) => {
          const date = getDayDate(i);
          const today = isToday(i);
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs font-medium transition-all min-w-[3.5rem] ${
                selectedDay === i
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : today
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className="font-display text-[0.65rem] uppercase tracking-wider">{day}</span>
              <span className="text-lg font-bold leading-tight">{date.getDate()}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Day Info Bar */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {Math.floor(studyMinutes / 60)}h {studyMinutes % 60}m
            </span>
            <span className="text-xs text-muted-foreground">of learning</span>
          </div>
          {isTutorDay && (
            <span className="text-xs bg-info/15 text-info px-2 py-0.5 rounded-full font-medium">
              Tutor Day
            </span>
          )}
          {(dayName === "Sat" || dayName === "Sun") && (
            <span className="text-xs bg-success/15 text-success px-2 py-0.5 rounded-full font-medium">
              Weekend
            </span>
          )}
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Add Block Form */}
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

      {/* Timeline */}
      <div className="relative space-y-2">
        {/* Now indicator */}
        {isToday(selectedDay) && (
          <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{ top: `${getNowPosition(allBlocks)}%` }}>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
              <div className="flex-1 h-px bg-primary/40" />
              <span className="text-[0.6rem] font-medium text-primary">NOW</span>
            </div>
          </div>
        )}

        {allBlocks.map((block, i) => (
          <motion.div
            key={block.id + "-" + selectedDay}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`glass-card p-4 border-l-4 ${categoryStyles[block.category]} flex items-center justify-between group`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-lg opacity-60">{categoryIcons[block.category]}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium font-display text-foreground min-w-[5rem]">
                    {block.time}{block.endTime ? ` – ${block.endTime}` : ""}
                  </span>
                  {block.endTime && (
                    <span className="text-[0.6rem] text-muted-foreground">
                      {getDuration(block.time, block.endTime)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{block.title}</p>
                <span className="text-xs text-muted-foreground">{categoryLabels[block.category]}</span>
              </div>
            </div>
            {!block.fixed && (
              <button
                onClick={() => removeBlock(block.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 pt-4">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className={`h-2.5 w-2.5 rounded-full ${
              key === "school" ? "bg-primary" :
              key === "tutor" ? "bg-info" :
              key === "coaching" ? "bg-success" :
              key === "study" ? "bg-primary/60" :
              key === "health" ? "bg-success/60" :
              key === "personal" ? "bg-info/60" :
              "bg-muted-foreground/40"
            }`} />
            {label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function getDuration(start: string, end: string): string {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 60) return `${mins}min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function getNowPosition(blocks: TimeBlock[]): number {
  if (blocks.length === 0) return 0;
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const first = blocks[0].time.split(":").map(Number);
  const last = blocks[blocks.length - 1].endTime || blocks[blocks.length - 1].time;
  const lastMins = last.split(":").map(Number);
  const startMins = first[0] * 60 + first[1];
  const endMins = lastMins[0] * 60 + lastMins[1];
  const pct = ((nowMins - startMins) / (endMins - startMins)) * 100;
  return Math.max(0, Math.min(100, pct));
}
