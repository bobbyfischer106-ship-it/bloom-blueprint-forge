import { motion } from "framer-motion";
import { Trophy, Heart, BookOpen, Calendar, Lightbulb, Flame, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  { title: "Health", desc: "Track your vitals", icon: Heart, path: "/health", color: "bg-success/10 text-success" },
  { title: "Studies", desc: "Ace your subjects", icon: BookOpen, path: "/studies", color: "bg-primary/10 text-primary" },
  { title: "Schedule", desc: "Plan your day", icon: Calendar, path: "/schedule", color: "bg-info/10 text-info" },
  { title: "Discover", desc: "Expand your mind", icon: Lightbulb, path: "/discover", color: "bg-primary/10 text-primary" },
];

const greetings = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <h1 className="text-4xl font-display font-bold text-foreground">
          {greetings()}, <span className="text-gradient">Champion</span> 🏆
        </h1>
        <p className="text-muted-foreground text-lg">Your journey to becoming the best starts with today's actions.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Day Streak" value="12" subtitle="Keep it going!" icon={Flame} color="primary" />
        <StatCard title="Study Hours" value="4.5h" subtitle="Today" icon={BookOpen} color="info" />
        <StatCard title="Health Score" value="85%" subtitle="Above average" icon={Heart} color="success" />
        <StatCard title="Growth Rate" value="+15%" subtitle="This week" icon={TrendingUp} color="primary" />
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="font-display font-semibold text-foreground mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, i) => (
            <motion.button
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              onClick={() => navigate(link.path)}
              className="glass-card p-5 text-left hover:glow-amber transition-all duration-500 group"
            >
              <div className={`p-2.5 rounded-lg ${link.color} w-fit mb-3 group-hover:scale-110 transition-transform`}>
                <link.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm">{link.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-8 text-center glow-amber"
      >
        <Trophy className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse-glow" />
        <blockquote className="text-lg font-display font-medium text-foreground max-w-xl mx-auto">
          "Success is the sum of small efforts, repeated day in and day out."
        </blockquote>
        <p className="text-sm text-muted-foreground mt-2">— Robert Collier</p>
      </motion.div>

      {/* Today's Focus */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h2 className="font-display font-semibold text-foreground mb-4">Today's Focus Areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-primary text-xs font-medium uppercase tracking-wider mb-1">Morning</p>
            <p className="text-sm text-foreground">Workout + Mathematics</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-info text-xs font-medium uppercase tracking-wider mb-1">Afternoon</p>
            <p className="text-sm text-foreground">Physics + CS Project</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-success text-xs font-medium uppercase tracking-wider mb-1">Evening</p>
            <p className="text-sm text-foreground">Review + Discovery Reading</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
