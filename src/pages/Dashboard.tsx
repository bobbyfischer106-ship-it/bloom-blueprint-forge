import { motion } from "framer-motion";
import { Trophy, Heart, BookOpen, Calendar, Lightbulb, Flame, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const QUOTES = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "What we learn with pleasure we never forget.", author: "Alfred Mercier" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  { text: "Little things make big days.", author: "Unknown" },
  { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Strive for progress, not perfection.", author: "Unknown" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Knowledge is power. Information is liberating.", author: "Kofi Annan" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
];

const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return QUOTES[dayOfYear % QUOTES.length];
};

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
  const quote = useMemo(() => getDailyQuote(), []);
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
          "{quote.text}"
        </blockquote>
        <p className="text-sm text-muted-foreground mt-2">— {quote.author}</p>
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
