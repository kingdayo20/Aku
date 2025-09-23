import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  FileText, 
  Users, 
  Building, 
  FolderOpen, 
  Settings, 
  HelpCircle,
  Shield,
  Search,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "claims", label: "Claims", icon: FileText },
    { id: "workqueues", label: "Workqueues", icon: Users },
    { id: "appeals", label: "Appeals", icon: Shield },
    { id: "payers", label: "Payers", icon: Building },
    { id: "documents", label: "Documents", icon: FolderOpen },
    { id: "integrations", label: "Integrations", icon: Settings },
    { id: "audit-log", label: "Audit Log", icon: Shield },
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const todayStats = [
    { label: "Follow-ups due", value: 14 },
    { label: "New denials", value: 37 },
    { label: "Appeals pending", value: 8 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[#0F2C5D] rounded"></div>
          <div>
            <h1 className="font-bold text-[#0F2C5D]">Denial Intelligence</h1>
            <p className="text-xs text-gray-500">Your RCM control center</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Quick search (⌘K)"
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
                activeSection === item.id
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              {activeSection === item.id && (
                <ChevronRight className="h-4 w-4" />
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Today Stats */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Today</h3>
        <div className="space-y-2">
          {todayStats.map((stat) => (
            <div key={stat.label} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{stat.label}</span>
              <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;