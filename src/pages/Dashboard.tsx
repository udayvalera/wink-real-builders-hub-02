
import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import MainFeed from '../components/MainFeed';
import RightSidebar from '../components/RightSidebar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <MainFeed />
      <RightSidebar />
    </div>
  );
};

export default Dashboard;
