import { PlanetType } from '@prisma/client';
import { prisma } from './database';

interface PlanetGenerationConfig {
  universeSize: number;
  maxPlanets: number;
  pirateBasePercentage: number;
}

const PLANET_NAMES = [
  'Kepler', 'Proxima', 'Gliese', 'Trappist', 'Wolf', 'Ross', 'Barnard', 'Vega',
  'Altair', 'Rigel', 'Betelgeuse', 'Sirius', 'Canopus', 'Arcturus', 'Capella',
  'Aldebaran', 'Spica', 'Antares', 'Pollux', 'Fomalhaut', 'Deneb', 'Regulus',
  'Adhara', 'Castor', 'Gacrux', 'Bellatrix', 'Elnath', 'Miaplacidus', 'Alnilam',
  'Alnair', 'Alioth', 'Dubhe', 'Mirfak', 'Wezen', 'Sargas', 'Kaus', 'Avior',
  'Menkalinan', 'Atria', 'Alhena', 'Peacock', 'Alsephina', 'Mirzam', 'Polaris',
  'Alphard', 'Mintaka', 'Schedar', 'Almaaz', 'Rasalgethi', 'Tau', 'Delta'
];

const PLANET_SUFFIXES = [
  'Prime', 'Alpha', 'Beta', 'Gamma', 'Major', 'Minor', 'Central', 'Outer',
  'Inner', 'North', 'South', 'East', 'West', 'Station', 'Colony', 'Outpost'
];

export class UniverseGenerator {
  private config: PlanetGenerationConfig;
  private usedNames: Set<string> = new Set();

  constructor(config: PlanetGenerationConfig) {
    this.config = config;
  }

  private generateRandomName(): string {
    let attempts = 0;
    let name: string;
    
    do {
      const baseName = PLANET_NAMES[Math.floor(Math.random() * PLANET_NAMES.length)];
      const suffix = PLANET_SUFFIXES[Math.floor(Math.random() * PLANET_SUFFIXES.length)];
      name = `${baseName} ${suffix}`;
      attempts++;
      
      if (attempts > 100) {
        // Fallback to numbered planets
        name = `Planet-${Math.floor(Math.random() * 10000)}`;
        break;
      }
    } while (this.usedNames.has(name));
    
    this.usedNames.add(name);
    return name;
  }

  private generatePosition(): { x: number; y: number; z: number } {
    const size = this.config.universeSize;
    return {
      x: (Math.random() - 0.5) * size,
      y: (Math.random() - 0.5) * size,
      z: (Math.random() - 0.5) * size * 0.1, // Flatter universe
    };
  }

  private generatePlanetType(): PlanetType {
    const types = Object.values(PlanetType);
    const weights = {
      [PlanetType.TERRESTRIAL]: 25,
      [PlanetType.GAS_GIANT]: 20,
      [PlanetType.ICE_WORLD]: 15,
      [PlanetType.VOLCANIC]: 10,
      [PlanetType.DESERT]: 15,
      [PlanetType.OCEAN]: 10,
      [PlanetType.ASTEROID_FIELD]: 5,
    };

    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (const [type, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) {
        return type as PlanetType;
      }
    }

    return PlanetType.TERRESTRIAL;
  }

  private generateResourceRichness(planetType: PlanetType): Record<string, number> {
    const base = {
      ironRichness: Math.floor(Math.random() * 100),
      siliconRichness: Math.floor(Math.random() * 100),
      carbonRichness: Math.floor(Math.random() * 100),
      titanRichness: Math.floor(Math.random() * 50),
      uraniumRichness: Math.floor(Math.random() * 25),
      waterRichness: Math.floor(Math.random() * 100),
      goldRichness: Math.floor(Math.random() * 10),
      copperRichness: Math.floor(Math.random() * 75),
    };

    // Modify based on planet type
    switch (planetType) {
      case PlanetType.VOLCANIC:
        base.ironRichness += 50;
        base.titanRichness += 25;
        base.waterRichness = Math.max(0, base.waterRichness - 50);
        break;
      case PlanetType.ICE_WORLD:
        base.waterRichness += 75;
        base.uraniumRichness = Math.max(0, base.uraniumRichness - 10);
        break;
      case PlanetType.OCEAN:
        base.waterRichness += 100;
        base.ironRichness = Math.max(0, base.ironRichness - 25);
        break;
      case PlanetType.ASTEROID_FIELD:
        base.ironRichness += 75;
        base.siliconRichness += 50;
        base.titanRichness += 40;
        base.waterRichness = Math.max(0, base.waterRichness - 75);
        break;
      case PlanetType.GAS_GIANT:
        base.uraniumRichness += 30;
        base.waterRichness += 25;
        base.ironRichness = Math.max(0, base.ironRichness - 50);
        break;
    }

    // Ensure values don't exceed 100
    Object.keys(base).forEach(key => {
      base[key as keyof typeof base] = Math.min(100, base[key as keyof typeof base]);
    });

    return base;
  }

  private generatePlanetStats(planetType: PlanetType) {
    const size = Math.floor(Math.random() * 10) + 1;
    let temperature, atmosphere, gravity;

    switch (planetType) {
      case PlanetType.VOLCANIC:
        temperature = Math.floor(Math.random() * 200) + 100; // 100-300°C
        atmosphere = 'Toxic';
        gravity = 0.8 + Math.random() * 0.6; // 0.8-1.4g
        break;
      case PlanetType.ICE_WORLD:
        temperature = Math.floor(Math.random() * 50) - 100; // -100 to -50°C
        atmosphere = 'Thin';
        gravity = 0.3 + Math.random() * 0.5; // 0.3-0.8g
        break;
      case PlanetType.OCEAN:
        temperature = Math.floor(Math.random() * 40) + 10; // 10-50°C
        atmosphere = 'Dense';
        gravity = 0.9 + Math.random() * 0.4; // 0.9-1.3g
        break;
      case PlanetType.DESERT:
        temperature = Math.floor(Math.random() * 80) + 20; // 20-100°C
        atmosphere = 'Thin';
        gravity = 0.7 + Math.random() * 0.6; // 0.7-1.3g
        break;
      case PlanetType.GAS_GIANT:
        temperature = Math.floor(Math.random() * 100) - 150; // -150 to -50°C
        atmosphere = 'Gas';
        gravity = 1.5 + Math.random() * 2; // 1.5-3.5g
        break;
      case PlanetType.ASTEROID_FIELD:
        temperature = Math.floor(Math.random() * 200) - 100; // -100 to 100°C
        atmosphere = 'None';
        gravity = 0.1 + Math.random() * 0.3; // 0.1-0.4g
        break;
      default: // TERRESTRIAL
        temperature = Math.floor(Math.random() * 60) - 10; // -10 to 50°C
        atmosphere = 'Breathable';
        gravity = 0.8 + Math.random() * 0.4; // 0.8-1.2g
    }

    return { size, temperature, atmosphere, gravity };
  }

  async generateUniverse(): Promise<void> {
    console.log('Starting universe generation...');
    
    // Clear existing planets
    await prisma.planet.deleteMany();
    
    const planets = [];
    const pirateBaseCount = Math.floor(this.config.maxPlanets * (this.config.pirateBasePercentage / 100));
    
    for (let i = 0; i < this.config.maxPlanets; i++) {
      const name = this.generateRandomName();
      const position = this.generatePosition();
      const type = this.generatePlanetType();
      const resourceRichness = this.generateResourceRichness(type);
      const stats = this.generatePlanetStats(type);
      const isPirateBase = i < pirateBaseCount;

      planets.push({
        name,
        type,
        ...position,
        ...resourceRichness,
        ...stats,
        isPirateBase,
      });
    }

    // Batch insert planets
    await prisma.planet.createMany({
      data: planets,
    });

    console.log(`Generated ${planets.length} planets with ${pirateBaseCount} pirate bases`);
  }

  async getPlanetStats(): Promise<{
    totalPlanets: number;
    planetTypes: Record<string, number>;
    pirateBases: number;
  }> {
    const totalPlanets = await prisma.planet.count();
    const pirateBases = await prisma.planet.count({ where: { isPirateBase: true } });
    
    const planetTypeGroups = await prisma.planet.groupBy({
      by: ['type'],
      _count: true,
    });

    const planetTypes: Record<string, number> = {};
    planetTypeGroups.forEach(group => {
      planetTypes[group.type] = group._count;
    });

    return {
      totalPlanets,
      planetTypes,
      pirateBases,
    };
  }
}