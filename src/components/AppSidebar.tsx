import { LayoutDashboard, Heart, BookOpen, Calendar, Lightbulb, Trophy, Target, PenLine } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Health", url: "/health", icon: Heart },
  { title: "Studies", url: "/studies", icon: BookOpen },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Goals", url: "/goals", icon: Target },
  { title: "Journal", url: "/journal", icon: PenLine },
  { title: "Discover", url: "/discover", icon: Lightbulb },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-6">
        <div className="px-4 mb-8 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary shrink-0" />
          {!collapsed && (
            <span className="font-display text-lg font-bold text-gradient">
              ASCEND
            </span>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
