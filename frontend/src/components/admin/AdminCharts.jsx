import React from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

/**
 * Renders the primary analytics charts for the Admin Dashboard.
 * Now receives data dynamically via props.
 */
const AdminCharts = ({ platformUsageData, monthlyTripsData }) => {
  return (
    <div className="charts-container">
      {/* User Demographics Pie Chart */}
      <div className="chart-card">
        <h2>User Demographics</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={platformUsageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {platformUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trips Bar Chart */}
      <div className="chart-card">
        <h2>Trips Created (Last 6 Months)</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTripsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)'}} />
              <RechartsTooltip cursor={{fill: 'var(--bg-main)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)'}} />
              <Bar dataKey="trips" fill="var(--secondary)" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
