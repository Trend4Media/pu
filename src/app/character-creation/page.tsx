'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RACE_BONUSES } from '@/types/game';

const RACE_DESCRIPTIONS = {
  HUMAN: {
    name: 'Human',
    description: 'Versatile and diplomatic, humans excel at research and building trade networks. Their balanced approach makes them ideal for new players.',
    lore: 'The human race has spread across the galaxy through diplomacy and trade, forming the backbone of galactic civilization.',
    color: 'text-blue-400',
  },
  ZEPHYRIAN: {
    name: 'Zephyrian',
    description: 'A warrior race with superior weapons technology and fast ships. Masters of plasma weaponry and stealth tactics.',
    lore: 'Born from the storms of gas giants, Zephyrians are natural warriors who value honor and strength above all else.',
    color: 'text-red-400',
  },
  CRYSTALLINE: {
    name: 'Crystalline',
    description: 'Ancient silicon-based beings with unmatched research capabilities and unique crystal technologies.',
    lore: 'These ancient beings evolved from living crystals, possessing vast knowledge and the ability to manipulate energy itself.',
    color: 'text-purple-400',
  },
  MECHANOID: {
    name: 'Mechanoid',
    description: 'Synthetic beings with enhanced automation and repair systems. Excellent for industrial and military applications.',
    lore: 'Created by an extinct race, Mechanoids have achieved consciousness and now seek to understand their purpose in the galaxy.',
    color: 'text-gray-400',
  },
  VOID_BORN: {
    name: 'Void Born',
    description: 'Mysterious entities from dark space with powerful weapons and incredible speed, but limited research capabilities.',
    lore: 'Born in the void between stars, these enigmatic beings manipulate dark energy and are feared across the galaxy.',
    color: 'text-purple-600',
  },
};

export default function CharacterCreationPage() {
  const [formData, setFormData] = useState({
    name: '',
    race: 'HUMAN' as keyof typeof RACE_DESCRIPTIONS,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/protected/player/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Character creation failed');
      }

      // Character created successfully
      router.push('/game');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Character creation failed');
    } finally {
      setLoading(false);
    }
  };

  const selectedRace = RACE_DESCRIPTIONS[formData.race];
  const raceBonuses = RACE_BONUSES[formData.race];

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-dark to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-space-gold mb-4">Create Your Character</h1>
          <p className="text-gray-400">Choose your race and begin your galactic conquest</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Character Name */}
          <div className="space-card">
            <h2 className="text-2xl font-bold mb-4">Character Name</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your character name"
              className="w-full space-input text-lg"
              required
              maxLength={50}
            />
          </div>

          {/* Race Selection */}
          <div className="space-card">
            <h2 className="text-2xl font-bold mb-4">Choose Your Race</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Object.entries(RACE_DESCRIPTIONS).map(([raceKey, race]) => (
                <div
                  key={raceKey}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    formData.race === raceKey
                      ? 'border-space-blue bg-space-blue bg-opacity-20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, race: raceKey as keyof typeof RACE_DESCRIPTIONS }))}
                >
                  <h3 className={`text-lg font-bold ${race.color} mb-2`}>
                    {race.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {race.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Race Details */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className={`text-2xl font-bold ${selectedRace.color} mb-3`}>
                {selectedRace.name}
              </h3>
              <p className="text-gray-300 mb-4">{selectedRace.lore}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-space-gold mb-2">Racial Bonuses</h4>
                  <ul className="space-y-1 text-green-400">
                    {raceBonuses.weaponBonus !== 0 && (
                      <li>• Weapon Damage: {raceBonuses.weaponBonus > 0 ? '+' : ''}{raceBonuses.weaponBonus}%</li>
                    )}
                    {raceBonuses.cargoBonus !== 0 && (
                      <li>• Cargo Capacity: {raceBonuses.cargoBonus > 0 ? '+' : ''}{raceBonuses.cargoBonus}%</li>
                    )}
                    {raceBonuses.driveBonus !== 0 && (
                      <li>• Ship Speed: {raceBonuses.driveBonus > 0 ? '+' : ''}{raceBonuses.driveBonus}%</li>
                    )}
                    {raceBonuses.researchBonus !== 0 && (
                      <li>• Research Speed: {raceBonuses.researchBonus > 0 ? '+' : ''}{raceBonuses.researchBonus}%</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-space-gold mb-2">Special Technologies</h4>
                  <ul className="space-y-1 text-blue-400">
                    {raceBonuses.specialTech.map((tech, index) => (
                      <li key={index}>• {tech.replace('_', ' ')}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="space-button text-lg px-8 py-3 disabled:opacity-50"
            >
              {loading ? 'Creating Character...' : 'Begin Your Journey'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}