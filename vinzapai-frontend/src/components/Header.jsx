import React, { useState } from 'react';
import { Bell, Search, Menu, LogOut } from 'lucide-react';

function Header({ pageTitle, onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New AI insight generated', time: '2 minutes ago' },
    { id: 2, message: 'Project milestone completed', time: '1 hour ago' },
    { id: 3, message: 'Team member joined', time: '3 hours ago' },
  ];

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {pageTitle}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-700 rounded-lg px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-48 text-white placeholder-gray-400"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-50">
                <div className="p-4 border-b border-gray-600">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 border-b border-gray-600 hover:bg-gray-600 transition-colors cursor-pointer last:border-b-0"
                    >
                      <p className="text-sm text-gray-200">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">System Owner</p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center font-bold hover:shadow-lg transition-shadow">
              A
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
