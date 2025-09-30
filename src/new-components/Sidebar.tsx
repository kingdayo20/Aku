import {
  LayoutGrid,
  Users,
  CreditCard,
  FileText,
  Shield,
  DollarSign,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutGrid, key: "dashboard" },
  { name: "Customers", icon: Users, key: "customers" },
  { name: "Companies", icon: CreditCard, key: "companies" },
  { name: "Claims", icon: FileText, key: "claims" },
  { name: "Appeals", icon: Shield, key: "appeals" },
  { name: "Payers", icon: DollarSign, key: "payers" },
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
        <h1 className="text-3xl font-bold text-[#0F2C5D]">
          Akuvera<span className="text-[#00A896] text-sm ml-2">AI</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSectionChange(item.key)}
            className={`flex items-center w-full px-4 py-2 text-sm font-medium text-left rounded-lg ${
              activeSection === item.key
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;