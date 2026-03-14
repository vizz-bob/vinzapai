import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Filter } from 'lucide-react';

function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/api/team/', {
        headers: { 'Accept': 'application/json' },
      });
      setTeamMembers(response.data || demoTeamMembers);
    } catch (error) {
      console.log('Using demo team data:', error.message);
      setTeamMembers(demoTeamMembers);
    } finally {
      setLoading(false);
    }
  };

  const demoTeamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@vinzapai.com',
      role: 'admin',
      department: 'Leadership',
      avatar_initials: 'SC',
      is_active: true,
      joined_date: '2023-06-01',
      ai_productivity_score: 95,
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      email: 'marcus.johnson@vinzapai.com',
      role: 'developer',
      department: 'Engineering',
      avatar_initials: 'MJ',
      is_active: true,
      joined_date: '2023-08-15',
      ai_productivity_score: 88,
    },
    {
      id: 3,
      name: 'Emma Williams',
      email: 'emma.williams@vinzapai.com',
      role: 'designer',
      department: 'Design',
      avatar_initials: 'EW',
      is_active: true,
      joined_date: '2023-09-01',
      ai_productivity_score: 82,
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.rodriguez@vinzapai.com',
      role: 'developer',
      department: 'Engineering',
      avatar_initials: 'DR',
      is_active: true,
      joined_date: '2023-10-10',
      ai_productivity_score: 91,
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@vinzapai.com',
      role: 'analyst',
      department: 'Analytics',
      avatar_initials: 'LA',
      is_active: true,
      joined_date: '2023-11-05',
      ai_productivity_score: 78,
    },
    {
      id: 6,
      name: 'James Park',
      email: 'james.park@vinzapai.com',
      role: 'manager',
      department: 'Product',
      avatar_initials: 'JP',
      is_active: true,
      joined_date: '2023-07-20',
      ai_productivity_score: 85,
    },
    {
      id: 7,
      name: 'Amanda Turner',
      email: 'amanda.turner@vinzapai.com',
      role: 'developer',
      department: 'Engineering',
      avatar_initials: 'AT',
      is_active: true,
      joined_date: '2024-01-08',
      ai_productivity_score: 76,
    },
    {
      id: 8,
      name: 'Carlos Mendez',
      email: 'carlos.mendez@vinzapai.com',
      role: 'designer',
      department: 'Design',
      avatar_initials: 'CM',
      is_active: false,
      joined_date: '2023-12-15',
      ai_productivity_score: 68,
    },
  ];

  const roleConfig = {
    admin: { label: 'Admin', color: 'bg-red-500/20 text-red-400' },
    developer: { label: 'Developer', color: 'bg-blue-500/20 text-blue-400' },
    designer: { label: 'Designer', color: 'bg-purple-500/20 text-purple-400' },
    manager: { label: 'Manager', color: 'bg-orange-500/20 text-orange-400' },
    analyst: { label: 'Analyst', color: 'bg-green-500/20 text-green-400' },
  };

  const getRoleConfig = (role) => roleConfig[role] || roleConfig.developer;

  const departments = ['all', ...new Set(teamMembers.map(m => m.department))];
  const filteredMembers = departmentFilter === 'all'
    ? teamMembers
    : teamMembers.filter(m => m.department === departmentFilter);

  const getProductivityColor = (score) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getAvatarColor = (index) => {
    const colors = [
      'from-indigo-400 to-purple-500',
      'from-blue-400 to-cyan-500',
      'from-pink-400 to-red-500',
      'from-yellow-400 to-orange-500',
      'from-green-400 to-teal-500',
      'from-purple-400 to-pink-500',
      'from-cyan-400 to-blue-500',
      'from-orange-400 to-yellow-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header with Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
            <Filter size={18} className="text-gray-400" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-transparent outline-none text-sm text-white"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
          <span className="text-sm text-gray-400">{filteredMembers.length} team members</span>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, idx) => {
          const roleConfig = getRoleConfig(member.role);
          const avatarColor = getAvatarColor(idx);

          return (
            <div
              key={member.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-200 card-hover flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${avatarColor} rounded-lg flex items-center justify-center text-2xl font-bold text-white border-2 border-gray-700`}>
                  {member.avatar_initials}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${roleConfig.color}`}>
                  {roleConfig.label}
                </div>
              </div>

              {/* Member Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{member.email}</p>
                <p className="text-gray-500 text-xs mt-2">{member.department}</p>
              </div>

              {/* Status */}
              <div className="mb-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${member.is_active ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <span className={`text-xs font-medium ${member.is_active ? 'text-green-400' : 'text-gray-400'}`}>
                  {member.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* AI Productivity Score */}
              <div className="mb-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">AI Productivity</span>
                  <span className="text-sm font-bold">{member.ai_productivity_score}%</span>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProductivityColor(member.ai_productivity_score)} transition-all duration-300`}
                    style={{ width: `${member.ai_productivity_score}%` }}
                  ></div>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-500">
                Joined: {new Date(member.joined_date).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm font-medium mb-2">Total Members</p>
          <p className="text-3xl font-bold">{teamMembers.length}</p>
          <p className="text-gray-500 text-xs mt-2">{teamMembers.filter(m => m.is_active).length} active</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm font-medium mb-2">Average Productivity</p>
          <p className="text-3xl font-bold">
            {(teamMembers.reduce((sum, m) => sum + m.ai_productivity_score, 0) / teamMembers.length).toFixed(0)}%
          </p>
          <p className="text-gray-500 text-xs mt-2">AI-assisted efficiency</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <p className="text-gray-400 text-sm font-medium mb-2">Departments</p>
          <p className="text-3xl font-bold">{new Set(teamMembers.map(m => m.department)).size}</p>
          <p className="text-gray-500 text-xs mt-2">Cross-functional teams</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
