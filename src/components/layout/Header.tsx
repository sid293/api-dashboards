import { useState } from 'react';
// import { useTheme } from 'next-themes';

interface HeaderProps {
  onHamburgerClick?: () => void;
}

export default function Header({ onHamburgerClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  // const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white dark:bg-gray-800 shadow-sm z-40 flex items-center">
      <div className="flex items-center justify-between h-full px-6 w-full">
        {/* Hamburger (mobile/tablet) */}
        <button
          className="p-2 rounded-lg mx-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={onHamburgerClick}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          {/* <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button> */}

          {/* Profile */}
          <div className="relative mx-2">
            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 