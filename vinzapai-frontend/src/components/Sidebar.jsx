import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Briefcase,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
} from 'lucide-react';

function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/projects', icon: Briefcase, label: 'Projects' },
    { path: '/team', icon: Users, label: 'Team' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          {isOpen && <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">VinzapAI</span>}
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center font-bold">
            A
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin</p>
              <p className="text-xs text-gray-400 truncate">System Owner</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
