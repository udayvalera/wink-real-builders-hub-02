
import React from 'react';
import { User, MessageSquare, Trophy, Hash } from 'lucide-react';

interface SearchResult {
  type: 'user' | 'post' | 'challenge' | 'trending';
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
}

interface SearchDropdownProps {
  query: string;
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  onViewAll: () => void;
}

const SearchDropdown = ({ query, results, onSelect, onViewAll }: SearchDropdownProps) => {
  if (!query.trim() || results.length === 0) return null;

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return <User size={16} className="text-blue-500" />;
      case 'post': return <MessageSquare size={16} className="text-green-500" />;
      case 'challenge': return <Trophy size={16} className="text-orange-500" />;
      case 'trending': return <Hash size={16} className="text-purple-500" />;
      default: return null;
    }
  };

  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'user': return 'Users';
      case 'post': return 'Posts';
      case 'challenge': return 'Challenges';
      case 'trending': return 'Trending';
      default: return type;
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
      {Object.entries(groupedResults).map(([type, items]) => (
        <div key={type} className="border-b border-gray-100 last:border-b-0">
          <div className="px-4 py-2 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
              {getIcon(type)}
              <span>{getSectionTitle(type)}</span>
            </h3>
          </div>
          <div className="py-2">
            {items.slice(0, 3).map((result) => (
              <button
                key={result.id}
                onClick={() => onSelect(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
              >
                {result.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                  {result.subtitle && (
                    <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
      
      <button
        onClick={onViewAll}
        className="w-full px-4 py-3 text-center text-sm text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
      >
        View All Results
      </button>
    </div>
  );
};

export default SearchDropdown;
