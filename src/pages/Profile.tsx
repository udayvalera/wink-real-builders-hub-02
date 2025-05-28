
import React, { useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import UserProfile from '../components/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 ml-60">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
