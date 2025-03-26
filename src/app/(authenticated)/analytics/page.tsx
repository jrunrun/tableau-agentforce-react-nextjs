'use client';

import { TableauViz } from '@tableau/embedding-api-react';

const metrics = [
  {
    name: 'Revenue',
    value: '$2.4M',
    change: '+12.5%',
    trend: 'up',
  },
  {
    name: 'Active Users',
    value: '24.5K',
    change: '+25.2%',
    trend: 'up',
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    trend: 'down',
  },
  {
    name: 'Avg. Order Value',
    value: '$245',
    change: '+10.3%',
    trend: 'up',
  },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col"
            >
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tableau Visualization */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Performance</h2>
          <div className="h-[600px] w-full">
            <TableauViz
              src="https://us-west-2b.online.tableau.com/t/eacloud/views/Superstore/Overview"
              height="600px"
              width="100%"
              hideTabs
            />
          </div>
        </div>
      </div>
    </div>
  );
} 