'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Globe, 
  Rocket, 
  Users, 
  FlaskConical, 
  TrendingUp, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  race: string;
  level: number;
  cash: number;
  resources: {
    iron: number;
    silicon: number;
    carbon: number;
    titan: number;
    uranium: number;
    water: number;
    gold: number;
    copper: number;
  };
  politicalFocus: string;
}

interface GameLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function GameLayout({ children, currentPage }: GameLayoutProps) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPlayer();
  }, []);

  const fetchPlayer = async () => {
    try {
      const response = await fetch('/api/protected/player');
      if (!response.ok) {
        throw new Error('Failed to fetch player');
      }
      const data = await response.json();
      setPlayer(data.player);
    } catch (error) {
      console.error('Error fetching player:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/game', icon: Home, current: currentPage === 'dashboard' },
    { name: 'Universe', href: '/game/universe', icon: Globe, current: currentPage === 'universe' },
    { name: 'Fleet', href: '/game/fleet', icon: Rocket, current: currentPage === 'fleet' },
    { name: 'Research', href: '/game/research', icon: FlaskConical, current: currentPage === 'research' },
    { name: 'Alliance', href: '/game/alliance', icon: Users, current: currentPage === 'alliance' },
    { name: 'Trade', href: '/game/trade', icon: TrendingUp, current: currentPage === 'trade' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-space-blue mx-auto mb-4"></div>
          <p className="text-gray-400">Loading game data...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return null;
  }

  return (
    <div className="min-h-screen bg-space-dark">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          <h1 className="text-xl font-bold text-space-gold">SPACE CONQUEST</h1>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Player info */}
        <div className="p-4 border-b border-gray-700">
          <div className="text-sm text-gray-400">Commander</div>
          <div className="font-bold text-white">{player.name}</div>
          <div className="text-xs text-space-blue">{player.race} • Level {player.level}</div>
          <div className="text-xs text-space-gold">Cash: {player.cash.toLocaleString()}</div>
        </div>

        {/* Resources */}
        <div className="p-4 border-b border-gray-700">
          <div className="text-sm font-medium text-gray-400 mb-2">Resources</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Iron:</span>
              <span className="text-white">{player.resources.iron.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Silicon:</span>
              <span className="text-white">{player.resources.silicon.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Carbon:</span>
              <span className="text-white">{player.resources.carbon.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Titan:</span>
              <span className="text-white">{player.resources.titan.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Uranium:</span>
              <span className="text-white">{player.resources.uranium.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Water:</span>
              <span className="text-white">{player.resources.water.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gold:</span>
              <span className="text-white">{player.resources.gold.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Copper:</span>
              <span className="text-white">{player.resources.copper.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.current
                    ? 'nav-link-active'
                    : 'nav-link'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="nav-link group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-700 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-space-gold">SPACE CONQUEST</h1>
            <div className="w-6"></div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}