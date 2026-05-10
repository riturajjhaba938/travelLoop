import { Users, Plane, DollarSign, Activity } from 'lucide-react';

// Key Performance Indicators (KPIs)
export const kpiData = [
  { 
    id: 1, 
    title: 'Total Users', 
    value: '4,289', 
    trend: '+12.5%', 
    isUp: true, 
    icon: Users, 
    colorClass: 'icon-primary' 
  },
  { 
    id: 2, 
    title: 'Active Trips', 
    value: '842', 
    trend: '+5.2%', 
    isUp: true, 
    icon: Plane, 
    colorClass: 'icon-secondary' 
  },
  { 
    id: 3, 
    title: 'Total Activities', 
    value: '1,492', 
    trend: '-1.4%', 
    isUp: false, 
    icon: Activity, 
    colorClass: 'icon-tertiary' 
  },
  { 
    id: 4, 
    title: 'Platform Revenue', 
    value: '$24,500', 
    trend: '+18.2%', 
    isUp: true, 
    icon: DollarSign, 
    colorClass: 'icon-neutral' 
  },
];

// Data for User Demographics Pie Chart
export const platformUsageData = [
  { name: 'Active Users', value: 65, color: 'var(--tertiary)' },
  { name: 'Inactive Users', value: 25, color: 'var(--neutral-dark)' },
  { name: 'New Signups', value: 10, color: 'var(--primary)' },
];

// Data for Monthly Trips Bar Chart
export const monthlyTripsData = [
  { name: 'Jan', trips: 120 },
  { name: 'Feb', trips: 150 },
  { name: 'Mar', trips: 210 },
  { name: 'Apr', trips: 180 },
  { name: 'May', trips: 250 },
  { name: 'Jun', trips: 310 },
];

// Data for Recent Trips Table
export const tripsTableData = [
  { id: 'TRP-1042', name: 'Summer in Europe', user: 'Emma Watson', startDate: 'Jun 15, 2025', status: 'upcoming', budget: '$4,500' },
  { id: 'TRP-1041', name: 'Tokyo Adventure', user: 'John Doe', startDate: 'May 02, 2025', status: 'ongoing', budget: '$3,200' },
  { id: 'TRP-1040', name: 'Bali Retreat', user: 'Sarah Smith', startDate: 'Apr 10, 2025', status: 'completed', budget: '$2,100' },
  { id: 'TRP-1039', name: 'NYC Weekend', user: 'Mike Ross', startDate: 'Jul 20, 2025', status: 'pending', budget: '$1,800' },
];

// Data for User Management Table
export const usersTableData = [
  { id: 1, name: 'Emma Watson', email: 'emma@example.com', tripsCount: 4, joined: 'Jan 10, 2024', status: 'active' },
  { id: 2, name: 'John Doe', email: 'john.doe@example.com', tripsCount: 1, joined: 'Feb 15, 2024', status: 'active' },
  { id: 3, name: 'Sarah Smith', email: 'sarah.s@example.com', tripsCount: 7, joined: 'Nov 05, 2023', status: 'inactive' },
  { id: 4, name: 'Mike Ross', email: 'm.ross@example.com', tripsCount: 2, joined: 'Mar 20, 2024', status: 'active' },
];
