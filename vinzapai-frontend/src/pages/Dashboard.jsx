import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Lightbulb, DollarSign, Users, Zap, TrendingUp } from 'lucide-react';
import MetricCard from '../components/MetricCard';

function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [activities, setActivities] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard/dashboard_summary/', {
        headers: {
          'Accept': 'application/json',
        },
      });

      setMetrics(response.data.metrics || demoMetrics);
      setActivities(response.data.recent_activities || demoActivities);
      setInsights(response.data.ai_insights || demoInsights);
    } catch (error) {
      console.log('Using demo data:', error.message);
      setMetrics(demoMetrics);
      setActivities(demoActivities);
      setInsights(demoInsights);
    } finally {
      setLoading(false);
    }
  };

  const demoMetrics = [
    { id: 1, name: 'Total Revenue', value: 124580, change_percent: 12.5, icon: 'dollar', color: 'green', prefix: '$' },
    { id: 2, name: 'Active Users', value: 8429, change_percent: 8.2, icon: 'users', color: 'blue', suffix: '' },
    { id: 3, name: 'AI Queries', value: 52847, change_percent: 23.4, icon: 'zap', color: 'purple', suffix: '' },
    { id: 4, name: 'Conversion Rate', value: 3.24, change_percent: 5.1, icon: 'trending', color: 'indigo', suffix: '%' },
  ];

  const demoActivities = [
    { id: 1, activity_type: 'ai', title: 'AI Model Updated', description: 'Latest sentiment analysis model deployed', user_name: 'System', timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
    { id: 2, activity_type: 'user', title: 'New User Signup', description: 'Enterprise account created', user_name: 'Admin', timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
    { id: 3, activity_type: 'project', title: 'Project Milestone', description: 'Quarterly review completed successfully', user_name: 'Manager', timestamp: new Date(Date.now() - 60 * 60000).toISOString() },
    { id: 4, activity_type: 'system', title: 'Database Optimization', description: 'Performance improvement applied', user_name: 'System', timestamp: new Date(Date.now() - 120 * 60000).toISOString() },
    { id: 5, activity_type: 'ai', title: 'Anomaly Detected', description: 'Unusual traffic pattern identified', user_name: 'System', timestamp: new Date(Date.now() - 180 * 60000).toISOString() },
  ];

  const demoInsights = [
    { id: 1, title: 'Revenue Growth Opportunity', description: 'Premium tier shows 34% higher lifetime value potential. Consider targeted upsell campaign.', insight_type: 'recommendation', priority: 'high', is_active: true, created_at: new Date().toISOString() },
    { id: 2, title: 'User Engagement Peak', description: 'Peak engagement hours identified: 2-4 PM. Optimize content delivery for these windows.', insight_type: 'trend', priority: 'medium', is_active: true, created_at: new Date().toISOString() },
    { id: 3, title: 'Churn Risk Alert', description: 'Inactive users detected with 72% churn probability. Initiate re-engagement campaign.', insight_type: 'warning', priority: 'high', is_active: true, created_at: new Date().toISOString() },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 35000 },
    { month: 'Feb', revenue: 52000, expenses: 38000 },
    { month: 'Mar', revenue: 48000, expenses: 36000 },
    { month: 'Apr', revenue: 61000, expenses: 41000 },
    { month: 'May', revenue: 73000, expenses: 45000 },
    { month: 'Jun', revenue: 89000, expenses: 52000 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 2400 },
    { month: 'Feb', users: 3210 },
    { month: 'Mar', users: 4290 },
    { month: 'Apr', users: 5841 },
    { month: 'May', users: 7210 },
    { month: 'Jun', users: 8429 },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      user: Users,
      project: TrendingUp,
      ai: Lightbulb,
      system: Activity,
    };
    return icons[type] || Activity;
  };

  const getActivityColor = (type) => {
    const colors = {
      user: 'bg-blue-500/20 text-blue-400',
      project: 'bg-purple-500/20 text-purple-400',
      ai: 'bg-yellow-500/20 text-yellow-400',
      system: 'bg-gray-500/20 text-gray-400',
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500/20 text-red-400',
      medium: 'bg-yellow-500/20 text-yellow-400',
      low: 'bg-green-500/20 text-green-400',
    };
    return colors[priority] || 'bg-gray-500/20 text-gray-400';
  };

  const currentMetrics = loading ? demoMetrics : (metrics.length > 0 ? metrics : demoMetrics);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentMetrics.map((metric) => {
          const iconMap = {
            dollar: DollarSign,
            users: Users,
            zap: Zap,
            trending: TrendingUp,
          };
          const Icon = iconMap[metric.icon] || DollarSign;
          const colorMap = { green: 'green', blue: 'blue', purple: 'purple', indigo: 'indigo' };

          return (
            <MetricCard
              key={metric.id}
              name={metric.name}
              value={metric.value}
              changePercent={metric.change_percent}
              icon={Icon}
              color={colorMap[metric.color] || 'indigo'}
              prefix={metric.prefix || ''}
              suffix={metric.suffix || ''}
            />
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Area
                type="monotone"
                dataKey="users"
                fill="#8b5cf6"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={20} className="text-indigo-400" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {(activities || demoActivities).slice(0, 5).map((activity) => {
              const ActivityIcon = getActivityIcon(activity.activity_type);
              return (
                <div key={activity.id} className="flex gap-4 pb-4 border-b border-gray-700 last:border-b-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.activity_type)}`}>
                    <ActivityIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb size={20} className="text-yellow-400" />
            <h3 className="text-lg font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-4">
            {(insights || demoInsights).slice(0, 3).map((insight) => (
              <div key={insight.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(insight.priority)}`}>
                    {insight.priority}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
