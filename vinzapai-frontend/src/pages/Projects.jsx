import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Filter } from 'lucide-react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects/', {
        headers: { 'Accept': 'application/json' },
      });
      setProjects(response.data || demoProjects);
    } catch (error) {
      console.log('Using demo projects data:', error.message);
      setProjects(demoProjects);
    } finally {
      setLoading(false);
    }
  };

  const demoProjects = [
    {
      id: 1,
      name: 'AI Model Enhancement',
      description: 'Improve sentiment analysis accuracy',
      status: 'active',
      progress: 75,
      budget: 50000,
      spent: 38500,
      team_size: 8,
      ai_score: 92,
      start_date: '2024-01-15',
      end_date: '2024-06-30',
    },
    {
      id: 2,
      name: 'Dashboard Redesign',
      description: 'Modernize UI/UX',
      status: 'active',
      progress: 60,
      budget: 35000,
      spent: 21000,
      team_size: 5,
      ai_score: 85,
      start_date: '2024-02-01',
      end_date: '2024-07-15',
    },
    {
      id: 3,
      name: 'Mobile App Launch',
      description: 'Create iOS and Android applications',
      status: 'planning',
      progress: 15,
      budget: 120000,
      spent: 18000,
      team_size: 12,
      ai_score: 78,
      start_date: '2024-03-01',
      end_date: '2024-12-31',
    },
    {
      id: 4,
      name: 'API Integration',
      description: 'Third-party service integrations',
      status: 'completed',
      progress: 100,
      budget: 25000,
      spent: 24800,
      team_size: 4,
      ai_score: 88,
      start_date: '2023-11-01',
      end_date: '2024-01-31',
    },
    {
      id: 5,
      name: 'Security Audit',
      description: 'Comprehensive security assessment',
      status: 'on_hold',
      progress: 40,
      budget: 45000,
      spent: 18000,
      team_size: 6,
      ai_score: 72,
      start_date: '2024-02-15',
      end_date: '2024-05-30',
    },
  ];

  const statusConfig = {
    active: { label: 'Active', color: 'bg-blue-500/20 text-blue-400', border: 'border-blue-500/30' },
    completed: { label: 'Completed', color: 'bg-green-500/20 text-green-400', border: 'border-green-500/30' },
    on_hold: { label: 'On Hold', color: 'bg-orange-500/20 text-orange-400', border: 'border-orange-500/30' },
    planning: { label: 'Planning', color: 'bg-purple-500/20 text-purple-400', border: 'border-purple-500/30' },
  };

  const getStatusConfig = (status) => statusConfig[status] || statusConfig.planning;

  const filteredProjects = statusFilter === 'all'
    ? projects
    : projects.filter(p => p.status === statusFilter);

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
          <Filter size={18} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent outline-none text-sm text-white"
          >
            <option value="all">All Projects</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="planning">Planning</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>
        <span className="text-sm text-gray-400">{filteredProjects.length} projects</span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {filteredProjects.map((project) => {
          const statusConfig = getStatusConfig(project.status);
          const budgetRemaining = project.budget - project.spent;
          const budgetPercent = (project.spent / project.budget) * 100;

          return (
            <div
              key={project.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-200 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                  {statusConfig.label}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Progress</span>
                  <span className="text-sm font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(project.progress)} transition-all duration-300`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Budget & Team */}
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-t border-b border-gray-700">
                <div>
                  <p className="text-gray-400 text-xs font-medium mb-1">Budget</p>
                  <p className="text-lg font-semibold">${project.budget.toLocaleString()}</p>
                  <p className="text-gray-500 text-xs mt-1">Spent: ${project.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium mb-1">Team Size</p>
                  <p className="text-lg font-semibold">{project.team_size} members</p>
                  <div className="mt-2 flex -space-x-2">
                    {[...Array(Math.min(project.team_size, 4))].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold border border-gray-800"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Budget Utilization */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Budget Utilization</span>
                  <span className="text-sm font-semibold text-gray-400">{budgetPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                    style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* AI Score & Dates */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">AI Health Score:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${project.ai_score}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-300">{project.ai_score}%</span>
                  </div>
                </div>
                <span className="text-gray-500 text-xs">{project.start_date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
