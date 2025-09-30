import {
  ChevronRight,
  LayoutGrid,
  BarChart2,
  FileText,
  Briefcase,
  Shield,
  DollarSign,
  Book,
  Zap,
  FileClock,
  LifeBuoy,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutGrid, key: "dashboard" },
  { name: "Analytics", icon: BarChart2, key: "analytics" },
  { name: "Claims", icon: FileText, key: "claims" },
  { name: "Workqueues", icon: Briefcase, key: "workqueues" },
  { name: "Appeals", icon: Shield, key: "appeals" },
  { name: "Payers", icon: DollarSign, key: "payers" },
  { name: "Documents", icon: Book, key: "documents" },
  { name: "Integrations", icon: Zap, key: "integrations" },
  { name: "Audit Log", icon: FileClock, key: "audit-log" },
  { name: "Help", icon: LifeBuoy, key: "help" },
  { name: "Settings", icon: Settings, key: "settings" },
];

const Sidebar = ({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Devias</h1>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSectionChange(item.key)}
            className={`flex items-center w-full px-4 py-2 text-sm font-medium text-left rounded-lg ${
              activeSection === item.key
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="p-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900">
            Need more features?
          </h3>
          <p className="mt-1 text-xs text-gray-600">
            Check out our Pro solution template.
          </p>
          <a
            href="#"
            className="flex items-center justify-between mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <span>Pro</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;