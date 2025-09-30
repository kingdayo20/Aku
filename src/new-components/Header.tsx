import { Search, Bell } from 'lucide-react';

const Header = ({ title }: { title: string }) => {
  return (
    <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 capitalize">{title}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-900">
          <Bell className="w-6 h-6" />
        </button>
        <img
          className="w-10 h-10 rounded-full"
          src="https://i.pravatar.cc/40"
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default Header;