'use client';

import { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Globe, Users, Rocket, TrendingUp } from 'lucide-react';

interface UniverseStats {
  universe: {
    totalPlanets: number;
    pirateBases: number;
    colonizedPlanets: number;
    planetTypes: Record<string, number>;
  };
  players: {
    totalPlayers: number;
    totalAlliances: number;
    activeFleets: number;
  };
}

export default function GameDashboard() {
  const [stats, setStats] = useState<UniverseStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/protected/universe/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <GameLayout currentPage="dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-space-blue"></div>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout currentPage="dashboard">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-space-gold mb-2">Command Center</h1>
          <p className="text-gray-400">Welcome back, Commander. Here's your galactic overview.</p>
        </div>

        {/* Quick Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-card">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-space-blue mr-3" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.universe.totalPlanets.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Planets</div>
                </div>
              </div>
            </div>

            <div className="space-card">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-space-green mr-3" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.players.totalPlayers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Active Players</div>
                </div>
              </div>
            </div>

            <div className="space-card">
              <div className="flex items-center">
                <Rocket className="w-8 h-8 text-space-purple mr-3" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.players.activeFleets.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Active Fleets</div>
                </div>
              </div>
            </div>

            <div className="space-card">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-space-gold mr-3" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.players.totalAlliances.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Alliances</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Universe Overview */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-card">
              <h2 className="text-xl font-bold text-space-gold mb-4">Galaxy Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Colonized Planets:</span>
                  <span className="text-white">
                    {stats.universe.colonizedPlanets.toLocaleString()} / {stats.universe.totalPlanets.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pirate Bases:</span>
                  <span className="text-red-400">{stats.universe.pirateBases.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Colonization Rate:</span>
                  <span className="text-green-400">
                    {((stats.universe.colonizedPlanets / stats.universe.totalPlanets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-card">
              <h2 className="text-xl font-bold text-space-gold mb-4">Planet Types</h2>
              <div className="space-y-2">
                {Object.entries(stats.universe.planetTypes).map(([type, count]) => (
                  <div key={type} className="flex justify-between">
                    <span className="text-gray-400 capitalize">
                      {type.toLowerCase().replace('_', ' ')}:
                    </span>
                    <span className="text-white">{count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-card">
          <h2 className="text-xl font-bold text-space-gold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="space-button-secondary p-4 text-center">
              <Globe className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm">Explore Universe</div>
            </button>
            <button className="space-button-secondary p-4 text-center">
              <Rocket className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm">Build Fleet</div>
            </button>
            <button className="space-button-secondary p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm">Trade Resources</div>
            </button>
            <button className="space-button-secondary p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm">Join Alliance</div>
            </button>
          </div>
        </div>

        {/* Recent Events Placeholder */}
        <div className="space-card">
          <h2 className="text-xl font-bold text-space-gold mb-4">Recent Events</h2>
          <div className="text-gray-400 text-center py-8">
            <p>No recent events to display.</p>
            <p className="text-sm mt-2">Start exploring the universe to see activity here.</p>
          </div>
        </div>
      </div>
    </GameLayout>
  );
}