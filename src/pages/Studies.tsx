import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Circle, Target, Clock } from "lucide-react";
import { useState } from "react";

interface Subject {
  name: string;
  progress: number;
  tasks: { text: string; done: boolean }[];
}

const initialSubjects: Subject[] = [
  {
    name: "Mathematics",
    progress: 65,
    tasks: [
      { text: "Complete algebra practice set", done: true },
      { text: "Review calculus fundamentals", done: false },
      { text: "Solve 10 integration problems", done: false },
    ],
  },
  {
    name: "Physics",
    progress: 40,
    tasks: [
      { text: "Read chapter on electromagnetism", done: true },
      { text: "Lab report on wave motion", done: false },
      { text: "Practice numerical problems", done: false },
    ],
  },
  {
    name: "Computer Science",
    progress: 80,
    tasks: [
      { text: "Build sorting algorithm visualizer", done: true },
      { text: "Study data structures (trees)", done: true },
      { text: "Complete recursion exercises", done: false },
    ],
  },
];

export default function Studies() {
  const [subjects, setSubjects] = useState(initialSubjects);

  const toggleTask = (si: number, ti: number) => {
    setSubjects((prev) =>
      prev.map((s, i) =>
        i === si
          ? {
              ...s,
              tasks: s.tasks.map((t, j) => (j === ti ? { ...t, done: !t.done } : t)),
              progress: Math.round(
                (s.tasks.filter((t, j) => (j === ti ? !t.done : t.done)).length / s.tasks.length) * 100
              ),
            }
          : s
      )
    );
  };

  const totalProgress = Math.round(subjects.reduce((a, s) => a + s.progress, 0) / subjects.length);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Study Hub</h1>
        <p className="text-muted-foreground mt-1">Excellence is not a destination but a continuous journey.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Overall Progress</span>
          </div>
          <span className="text-2xl font-display font-bold text-gradient">{totalProgress}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-amber-300"
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, si) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="glass-card p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-foreground">{subject.name}</h3>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                {subject.progress}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="space-y-2">
              {subject.tasks.map((task, ti) => (
                <button
                  key={ti}
                  onClick={() => toggleTask(si, ti)}
                  className="flex items-center gap-2 w-full text-left text-sm group"
                >
                  {task.done ? (
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  )}
                  <span className={task.done ? "text-muted-foreground line-through" : "text-foreground"}>
                    {task.text}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-info" />
          <h3 className="font-display font-semibold text-foreground">Study Technique</h3>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p><span className="text-primary font-medium">Pomodoro Method:</span> Study for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer 15-30 minute break.</p>
          <p><span className="text-success font-medium">Active Recall:</span> Don't just re-read — close your notes and try to recall the key concepts from memory.</p>
        </div>
      </motion.div>
    </div>
  );
}
