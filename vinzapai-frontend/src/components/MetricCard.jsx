import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function MetricCard({ name, value, changePercent, icon: Icon, color = 'indigo', prefix = '', suffix = '' }) {
  const isPositive = changePercent >= 0;

  const colorClasses = {
    indigo: 'bg-indigo-500/20 text-indigo-400',
    purple: 'bg-purple-500/20 text-purple-400',
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    orange: 'bg-orange-500/20 text-orange-400',
    red: 'bg-red-500/20 text-red-400',
  };

  const changeTrendColor = isPositive ? 'text-green-400' : 'text-red-400';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-200 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {Icon && <Icon size={24} />}
        </div>
        <div className={`flex items-center gap-1 ${changeTrendColor}`}>
          <TrendIcon size={16} />
          <span className="text-sm font-semibold">{Math.abs(changePercent)}%</span>
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{name}</p>
        <p className="text-2xl font-bold text-white">
          {prefix}
          {typeof value === 'number' ? value.toLocaleString() : value}
          {suffix}
        </p>
      </div>
    </div>
  );
}

export default MetricCard;
