
import React from 'react';
import { Home, Briefcase, Trophy, Bell, Bookmark, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    { icon: Home, label: 'Home', path: '/dashboard', active: location.pathname === '/dashboard' },
    { icon: Briefcase, label: 'Jobs / Internships', path: '#', active: false },
    { icon: Trophy, label: 'Challenges', path: '#', active: false },
    { icon: Bell, label: 'Notifications', path: '#', active: false },
    { icon: Bookmark, label: 'Bookmarks', path: '#', active: false },
    { icon: User, label: 'Profile', path: '/profile', active: location.pathname === '/profile' }
  ];

  const performanceMetrics = [
    { name: 'Data Science', value: 23, trend: 'up' },
    { name: 'Front End', value: 1.3, suffix: 'k', trend: 'down' },
    { name: 'Marketing', value: 203, trend: 'down' }
  ];

  return (
    <div className="w-60 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 px-6 py-8">
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">wink</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-16">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const baseClassName = `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
            item.active
              ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`;
          
          // Render Link component for internal routes
          if (item.path.startsWith('/')) {
            return (
              <Link
                key={item.label}
                to={item.path}
                className={baseClassName}
              >
                <IconComponent size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          }
          
          // Render anchor tag for external links or placeholder links
          return (
            <a
              key={item.label}
              href={item.path}
              className={baseClassName}
            >
              <IconComponent size={20} />
              <span className="font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Performance Section */}
      <div>
        <h3 className="text-gray-900 font-semibold mb-4">Performance</h3>
        <div className="space-y-3">
          {performanceMetrics.map((metric) => (
            <div key={metric.name} className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">{metric.name}</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">
                  {metric.value}{metric.suffix || ''}
                </span>
                <span className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend === 'up' ? '▲' : '▼'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
