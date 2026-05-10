import React from 'react';

/**
 * Renders a single Key Performance Indicator card for the dashboard.
 */
const KPICard = ({ title, value, trend, isUp, icon: Icon, colorClass }) => {
  return (
    <div className="kpi-card">
      <div className={`kpi-icon ${colorClass}`}>
        <Icon size={28} />
      </div>
      <div className="kpi-content">
        <h3>{title}</h3>
        <p className="kpi-value">{value}</p>
        <p className={`kpi-trend ${isUp ? 'trend-up' : 'trend-down'}`}>
          {trend} from last month
        </p>
      </div>
    </div>
  );
};

export default KPICard;
