import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/MetricCard';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

function Analytics() {
  const [revenueData, setRevenueData] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [trafficSources, setTrafficSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [revenueRes, usersRes, trafficRes] = await Promise.all([
        axios.get('/api/revenue/', { headers: { 'Accept': 'application/json' } }),
        axios.get('/api/user-growth/', { headers: { 'Accept': 'application/json' } }),
        axios.get('/api/traffic-sources/', { headers: { 'Accept': 'application/json' } }),
      ]);

      setRevenueData(revenueRes.data || demoRevenueData);
      setUserGrowth(usersRes.data || demoUserGrowthData);
      setTrafficSources(trafficRes.data || demoTrafficSources);
    } catch (error) {
      console.log('Using demo analytics data:', error.message);
      setRevenueData(demoRevenueData);
      setUserGrowth(demoUserGrowthData);
      setTrafficSources(demoTrafficSources);
    } finally {
      setLoading(false);
    }
  };

  const demoRevenueData = [
    { month: 'January', revenue: 45000, expenses: 35000, profit: 10000 },
    { month: 'February', revenue: 52000, expenses: 38000, profit: 14000 },
    { month: 'March', revenue: 48000, expenses: 36000, profit: 12000 },
    { month: 'April', revenue: 61000, expenses: 41000, profit: 20000 },
    { month: 'May', revenue: 73000, expenses: 45000, profit: 28000 },
    { month: 'June', revenue: 89000, expenses: 52000, profit: 37000 },
  ];

  const demoUserGrowthData = [
    { month: 'January', new_users: 240, active_users: 2400, churned_users: 45 },
    { month: 'February', new_users: 310, active_users: 3210, churned_users: 52 },
    { month: 'March', new_users: 420, active_users: 4290, churned_users: 48 },
    { month: 'April', new_users: 580, active_users: 5841, churned_users: 61 },
    { month: 'May', new_users: 720, active_users: 7210, churned_users: 73 },
    { month: 'June', new_users: 890, active_users: 8429, churned_users: 81 },
  ];

  const demoTrafficSources = [
    { source: 'Organic Search', visitors: 45000, percentage: 42, color: '#6366f1' },
    { source: 'Social Media', visitors: 32000, percentage: 30, color: '#8b5cf6' },
    { source: 'Direct', visitors: 21000, percentage: 20, color: '#3b82f6' },
    { source: 'Referral', visitors: 9000, percentage: 8, color: '#10b981' },
  ];

  const currentRevenue = revenueData.length > 0 ? revenueData : demoRevenueData;
  const currentUsers = userGrowth.length > 0 ? userGrowth : demoUserGrowthData;
  const currentTraffic = trafficSources.length > 0 ? trafficSources : demoTrafficSources;

  const totalRevenue = currentRevenue.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalProfit = currentRevenue.reduce((sum, item) => sum + (item.profit || 0), 0);
  const totalUsers = currentUsers.length > 0 ? currentUsers[currentUsers.length - 1].active_users : 8429;

  const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981'];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          name="Total Revenue"
          value={totalRevenue}
          changePercent={15.3}
          icon={DollarSign}
          color="indigo"
          prefix="$"
        />
        <MetricCard
          name="Total Profit"
          value={totalProfit}
          changePercent={28.7}
          icon={TrendingUp}
          color="purple"
          prefix="$"
        />
        <MetricCard
          name="Active Users"
          value={totalUsers}
          changePercent={12.1}
          icon={Users}
          color="blue"
        />
      </div>

      {/* Revenue vs Expenses */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={currentRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={currentRevenue[0]?.month ? 'month' : 'month'} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#6366f1" name="Revenue" />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">User Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={currentUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey={currentUsers[0]?.month ? 'month' : 'month'} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="active_users"
                fill="#8b5cf6"
                stroke="#8b5cf6"
                name="Active Users"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={currentTraffic}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ source, percentage }) => `${source} ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="visitors"
              >
                {currentTraffic.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Sources Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Traffic Source Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-300">Source</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-300">Visitors</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-300">Percentage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-300">Trend</th>
              </tr>
            </thead>
            <tbody>
              {currentTraffic.map((source) => (
                <tr key={source.source} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: source.color || '#6366f1' }}
                    ></div>
                    {source.source}
                  </td>
                  <td className="py-3 px-4">{source.visitors?.toLocaleString() || 0}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${source.percentage || 0}%` }}
                        ></div>
                      </div>
                      <span>{source.percentage || 0}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-green-400">↑ 8%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
