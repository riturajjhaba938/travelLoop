import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

// Components
import KPICard from '../components/admin/KPICard';
import AdminCharts from '../components/admin/AdminCharts';
import TripsTable from '../components/admin/TripsTable';
import UsersTable from '../components/admin/UsersTable';

// Mock Data Loaders
import { 
  kpiData as initialKpis, 
  tripsTableData as initialTrips, 
  usersTableData as initialUsers,
  platformUsageData as initialUsage,
  monthlyTripsData as initialMonthly
} from '../data/adminMockData';

/**
 * Main Admin Dashboard View
 * Holds global state to make the dashboard dynamic and editable.
 */
const AdminDashboard = () => {
  // --- Global State ---
  const [trips, setTrips] = useState(initialTrips);
  const [users, setUsers] = useState(initialUsers);
  
  // Derived state for charts
  const [usageData, setUsageData] = useState(initialUsage);
  const [monthlyTrips, setMonthlyTrips] = useState(initialMonthly);
  
  // Dynamic KPIs
  const [kpis, setKpis] = useState(initialKpis);

  // Recalculate KPIs and Charts when data changes
  useEffect(() => {
    // Recalculate Active Users vs Inactive based on 'users' state
    const activeCount = users.filter(u => u.status === 'active').length;
    const inactiveCount = users.filter(u => u.status === 'inactive').length;
    
    setUsageData([
      { name: 'Active Users', value: activeCount, color: 'var(--tertiary)' },
      { name: 'Inactive Users', value: inactiveCount, color: 'var(--neutral-dark)' },
      { name: 'New Signups', value: 10, color: 'var(--primary)' }, // Static for demo
    ]);

    // Recalculate KPIs based on current state
    setKpis(prevKpis => {
      const newKpis = [...prevKpis];
      
      // Update Total Users
      newKpis[0] = { ...newKpis[0], value: (4285 + users.length).toLocaleString() };
      
      // Update Active Trips
      const activeTripsCount = trips.filter(t => t.status === 'ongoing' || t.status === 'upcoming').length;
      newKpis[1] = { ...newKpis[1], value: (838 + activeTripsCount).toLocaleString() };
      
      return newKpis;
    });
  }, [users, trips]);

  // --- Handlers for Trips Table ---
  const handleUpdateTrip = (updatedTrip) => {
    setTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };

  const handleDeleteTrip = (tripId) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
  };

  // --- Handlers for Users Table ---
  const handleUpdateUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  return (
    <div className="admin-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of platform performance and activities</p>
        </div>
        <select className="date-filter" aria-label="Filter by date range">
          <option>Last 30 Days</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </div>

      {/* KPI Section */}
      <div className="kpi-container">
        {kpis.map((kpi) => (
          <KPICard 
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            isUp={kpi.isUp}
            icon={kpi.icon}
            colorClass={kpi.colorClass}
          />
        ))}
      </div>

      {/* Analytics Charts Section */}
      <AdminCharts 
        platformUsageData={usageData} 
        monthlyTripsData={monthlyTrips} 
      />

      {/* Data Tables Section */}
      <div className="tables-container">
        <TripsTable 
          data={trips} 
          onUpdate={handleUpdateTrip} 
          onDelete={handleDeleteTrip} 
        />
        <UsersTable 
          data={users} 
          onUpdate={handleUpdateUser} 
          onDelete={handleDeleteUser} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
