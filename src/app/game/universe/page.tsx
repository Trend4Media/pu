'use client';

import { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { Search, Filter, MapPin, Users, Zap } from 'lucide-react';

interface Planet {
  id: string;
  name: string;
  type: string;
  size: number;
  x: number;
  y: number;
  z: number;
  temperature: number;
  atmosphere: string;
  gravity: number;
  isPirateBase: boolean;
  colonies: Array<{
    player: {
      name: string;
      race: string;
    };
  }>;
  fleets: Array<{
    player: {
      name: string;
    };
  }>;
  ironRichness: number;
  siliconRichness: number;
  carbonRichness: number;
  titanRichness: number;
  uraniumRichness: number;
  waterRichness: number;
  goldRichness: number;
  copperRichness: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const PLANET_TYPE_COLORS = {
  TERRESTRIAL: 'text-green-400',
  GAS_GIANT: 'text-blue-400',
  ICE_WORLD: 'text-cyan-400',
  VOLCANIC: 'text-red-400',
  DESERT: 'text-yellow-400',
  OCEAN: 'text-blue-500',
  ASTEROID_FIELD: 'text-gray-400',
};

const PLANET_TYPE_NAMES = {
  TERRESTRIAL: 'Terrestrial',
  GAS_GIANT: 'Gas Giant',
  ICE_WORLD: 'Ice World',
  VOLCANIC: 'Volcanic',
  DESERT: 'Desert',
  OCEAN: 'Ocean',
  ASTEROID_FIELD: 'Asteroid Field',
};

export default function UniversePage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 25,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    fetchPlanets();
  }, [pagination.page, search, typeFilter]);

  const fetchPlanets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });
      
      if (search) params.append('search', search);
      if (typeFilter) params.append('type', typeFilter);

      const response = await fetch(`/api/protected/universe/planets?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPlanets(data.planets);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching planets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchPlanets();
  };

  const getResourceColor = (richness: number) => {
    if (richness >= 75) return 'text-green-400';
    if (richness >= 50) return 'text-yellow-400';
    if (richness >= 25) return 'text-orange-400';
    return 'text-red-400';
  };

  const calculateDistance = (planet: Planet) => {
    return Math.sqrt(planet.x ** 2 + planet.y ** 2 + planet.z ** 2).toFixed(1);
  };

  return (
    <GameLayout currentPage="universe">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-space-gold mb-2">Universe Explorer</h1>
          <p className="text-gray-400">Discover planets, colonies, and opportunities across the galaxy.</p>
        </div>

        {/* Search and Filters */}
        <div className="space-card">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search planets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 space-input"
                />
              </div>
            </div>
            
            <div className="md:w-48">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full space-input"
              >
                <option value="">All Types</option>
                {Object.entries(PLANET_TYPE_NAMES).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="space-button">
              Search
            </button>
          </form>
        </div>

        {/* Planet List */}
        <div className="space-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Planets ({pagination.total.toLocaleString()})</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-space-blue"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="table-header">Name</th>
                      <th className="table-header">Type</th>
                      <th className="table-header">Size</th>
                      <th className="table-header">Distance</th>
                      <th className="table-header">Status</th>
                      <th className="table-header">Resources</th>
                      <th className="table-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {planets.map((planet) => (
                      <tr key={planet.id} className="hover:bg-gray-800">
                        <td className="table-cell">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <div>
                              <div className="font-medium text-white">{planet.name}</div>
                              <div className="text-xs text-gray-400">
                                ({planet.x.toFixed(0)}, {planet.y.toFixed(0)}, {planet.z.toFixed(0)})
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className={`font-medium ${PLANET_TYPE_COLORS[planet.type as keyof typeof PLANET_TYPE_COLORS]}`}>
                            {PLANET_TYPE_NAMES[planet.type as keyof typeof PLANET_TYPE_NAMES]}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gray-600 mr-2" style={{
                              width: `${12 + planet.size * 2}px`,
                              height: `${12 + planet.size * 2}px`,
                            }}></div>
                            <span>{planet.size}</span>
                          </div>
                        </td>
                        <td className="table-cell">{calculateDistance(planet)}</td>
                        <td className="table-cell">
                          <div className="space-y-1">
                            {planet.isPirateBase && (
                              <div className="flex items-center text-red-400 text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Pirate Base
                              </div>
                            )}
                            {planet.colonies.length > 0 && (
                              <div className="flex items-center text-green-400 text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                Colonized ({planet.colonies.length})
                              </div>
                            )}
                            {planet.fleets.length > 0 && (
                              <div className="text-blue-400 text-xs">
                                {planet.fleets.length} Fleet(s)
                              </div>
                            )}
                            {!planet.isPirateBase && planet.colonies.length === 0 && (
                              <span className="text-gray-400 text-xs">Unclaimed</span>
                            )}
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <div className={`${getResourceColor(planet.ironRichness)}`}>
                              Fe: {planet.ironRichness}
                            </div>
                            <div className={`${getResourceColor(planet.siliconRichness)}`}>
                              Si: {planet.siliconRichness}
                            </div>
                            <div className={`${getResourceColor(planet.titanRichness)}`}>
                              Ti: {planet.titanRichness}
                            </div>
                            <div className={`${getResourceColor(planet.uraniumRichness)}`}>
                              U: {planet.uraniumRichness}
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <button
                            onClick={() => setSelectedPlanet(planet)}
                            className="text-space-blue hover:text-blue-400 text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-400">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} planets
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                      disabled={pagination.page === 1}
                      className="space-button-secondary disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-white">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                      disabled={pagination.page === pagination.pages}
                      className="space-button-secondary disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Planet Details Modal */}
        {selectedPlanet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-space-gold">{selectedPlanet.name}</h2>
                  <button
                    onClick={() => setSelectedPlanet(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3">Planet Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className={PLANET_TYPE_COLORS[selectedPlanet.type as keyof typeof PLANET_TYPE_COLORS]}>
                          {PLANET_TYPE_NAMES[selectedPlanet.type as keyof typeof PLANET_TYPE_NAMES]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white">{selectedPlanet.size}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Temperature:</span>
                        <span className="text-white">{selectedPlanet.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Atmosphere:</span>
                        <span className="text-white">{selectedPlanet.atmosphere}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gravity:</span>
                        <span className="text-white">{selectedPlanet.gravity.toFixed(2)}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Distance:</span>
                        <span className="text-white">{calculateDistance(selectedPlanet)} units</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">Resource Richness</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Iron:</span>
                        <span className={getResourceColor(selectedPlanet.ironRichness)}>
                          {selectedPlanet.ironRichness}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Silicon:</span>
                        <span className={getResourceColor(selectedPlanet.siliconRichness)}>
                          {selectedPlanet.siliconRichness}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Carbon:</span>
                        <span className={getResourceColor(selectedPlanet.carbonRichness)}>
                          {selectedPlanet.carbonRichness}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Titan:</span>
                        <span className={getResourceColor(selectedPlanet.titanRichness)}>
                          {selectedPlanet.titanRichness}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uranium:</span>
                        <span className={getResourceColor(selectedPlanet.uraniumRichness)}>
                          {selectedPlanet.uraniumRichness}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Water:</span>
                        <span className={getResourceColor(selectedPlanet.waterRichness)}>
                          {selectedPlanet.waterRichness}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gold:</span>
                        <span className={getResourceColor(selectedPlanet.goldRichness)}>
                          {selectedPlanet.goldRichness}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Copper:</span>
                        <span className={getResourceColor(selectedPlanet.copperRichness)}>
                          {selectedPlanet.copperRichness}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="mt-6">
                  {selectedPlanet.isPirateBase && (
                    <div className="bg-red-900 border border-red-600 rounded p-3 mb-4">
                      <div className="flex items-center text-red-200">
                        <Zap className="w-4 h-4 mr-2" />
                        This planet is controlled by pirates. Military action required to colonize.
                      </div>
                    </div>
                  )}

                  {selectedPlanet.colonies.length > 0 && (
                    <div className="bg-green-900 border border-green-600 rounded p-3 mb-4">
                      <h4 className="font-bold text-green-200 mb-2">Colonies:</h4>
                      {selectedPlanet.colonies.map((colony, index) => (
                        <div key={index} className="text-green-200 text-sm">
                          • {colony.player.name} ({colony.player.race})
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-3">
                    {!selectedPlanet.isPirateBase && selectedPlanet.colonies.length === 0 && (
                      <button className="space-button">
                        Colonize Planet
                      </button>
                    )}
                    <button className="space-button-secondary">
                      Send Fleet
                    </button>
                    <button className="space-button-secondary">
                      Set as Waypoint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}