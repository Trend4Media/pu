export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Resources {
  iron: number;
  silicon: number;
  carbon: number;
  titan: number;
  uranium: number;
  water: number;
  gold: number;
  copper: number;
}

export interface RaceBonuses {
  weaponBonus: number;
  cargoBonus: number;
  driveBonus: number;
  researchBonus: number;
  specialTech: string[];
}

export const RACE_BONUSES: Record<string, RaceBonuses> = {
  HUMAN: {
    weaponBonus: 0,
    cargoBonus: 10,
    driveBonus: 5,
    researchBonus: 15,
    specialTech: ['DIPLOMACY', 'TRADE_NETWORKS']
  },
  ZEPHYRIAN: {
    weaponBonus: 20,
    cargoBonus: -5,
    driveBonus: 15,
    researchBonus: 0,
    specialTech: ['PLASMA_WEAPONS', 'STEALTH_TECH']
  },
  CRYSTALLINE: {
    weaponBonus: -10,
    cargoBonus: 5,
    driveBonus: -5,
    researchBonus: 25,
    specialTech: ['CRYSTAL_TECH', 'ENERGY_SHIELDS']
  },
  MECHANOID: {
    weaponBonus: 15,
    cargoBonus: 15,
    driveBonus: -10,
    researchBonus: 10,
    specialTech: ['AUTOMATION', 'REPAIR_BOTS']
  },
  VOID_BORN: {
    weaponBonus: 25,
    cargoBonus: -10,
    driveBonus: 20,
    researchBonus: -5,
    specialTech: ['VOID_MANIPULATION', 'DARK_ENERGY']
  }
};

export interface ShipStats {
  attack: number;
  defense: number;
  speed: number;
  cargoSpace: number;
  cost: Resources & { cash: number };
  buildTime: number; // in hours
}

export const SHIP_STATS: Record<string, ShipStats> = {
  FIGHTER: {
    attack: 10,
    defense: 5,
    speed: 100,
    cargoSpace: 10,
    cost: { iron: 50, silicon: 30, carbon: 20, titan: 5, uranium: 0, water: 0, gold: 0, copper: 15, cash: 1000 },
    buildTime: 1
  },
  CORVETTE: {
    attack: 25,
    defense: 15,
    speed: 80,
    cargoSpace: 50,
    cost: { iron: 150, silicon: 100, carbon: 75, titan: 25, uranium: 0, water: 0, gold: 0, copper: 50, cash: 5000 },
    buildTime: 3
  },
  FRIGATE: {
    attack: 50,
    defense: 35,
    speed: 60,
    cargoSpace: 100,
    cost: { iron: 300, silicon: 200, carbon: 150, titan: 75, uranium: 10, water: 0, gold: 0, copper: 100, cash: 15000 },
    buildTime: 8
  },
  DESTROYER: {
    attack: 100,
    defense: 75,
    speed: 50,
    cargoSpace: 150,
    cost: { iron: 600, silicon: 400, carbon: 300, titan: 150, uranium: 50, water: 0, gold: 5, copper: 200, cash: 35000 },
    buildTime: 16
  },
  CRUISER: {
    attack: 200,
    defense: 150,
    speed: 40,
    cargoSpace: 300,
    cost: { iron: 1200, silicon: 800, carbon: 600, titan: 300, uranium: 100, water: 0, gold: 15, copper: 400, cash: 75000 },
    buildTime: 32
  },
  BATTLESHIP: {
    attack: 400,
    defense: 300,
    speed: 30,
    cargoSpace: 500,
    cost: { iron: 2500, silicon: 1500, carbon: 1200, titan: 600, uranium: 200, water: 0, gold: 50, copper: 800, cash: 150000 },
    buildTime: 64
  },
  DREADNOUGHT: {
    attack: 800,
    defense: 600,
    speed: 20,
    cargoSpace: 1000,
    cost: { iron: 5000, silicon: 3000, carbon: 2500, titan: 1200, uranium: 500, water: 0, gold: 100, copper: 1500, cash: 350000 },
    buildTime: 128
  },
  CARRIER: {
    attack: 100,
    defense: 200,
    speed: 25,
    cargoSpace: 2000,
    cost: { iron: 3000, silicon: 2000, carbon: 1500, titan: 800, uranium: 300, water: 0, gold: 75, copper: 1000, cash: 200000 },
    buildTime: 96
  },
  TRANSPORT: {
    attack: 5,
    defense: 10,
    speed: 40,
    cargoSpace: 5000,
    cost: { iron: 200, silicon: 150, carbon: 100, titan: 50, uranium: 0, water: 0, gold: 0, copper: 75, cash: 8000 },
    buildTime: 6
  },
  MINING_VESSEL: {
    attack: 1,
    defense: 5,
    speed: 20,
    cargoSpace: 10000,
    cost: { iron: 500, silicon: 300, carbon: 200, titan: 100, uranium: 0, water: 0, gold: 0, copper: 200, cash: 25000 },
    buildTime: 12
  }
};

export interface BuildingStats {
  cost: Resources & { cash: number };
  buildTime: number; // in hours
  effects: Record<string, number>;
}

export const BUILDING_STATS: Record<string, BuildingStats> = {
  MINE: {
    cost: { iron: 100, silicon: 50, carbon: 25, titan: 0, uranium: 0, water: 0, gold: 0, copper: 50, cash: 2000 },
    buildTime: 2,
    effects: { resourceProduction: 10 }
  },
  FACTORY: {
    cost: { iron: 200, silicon: 150, carbon: 100, titan: 25, uranium: 0, water: 0, gold: 0, copper: 75, cash: 5000 },
    buildTime: 4,
    effects: { shipBuildSpeed: 15 }
  },
  RESEARCH_LAB: {
    cost: { iron: 150, silicon: 200, carbon: 75, titan: 50, uranium: 25, water: 0, gold: 5, copper: 100, cash: 8000 },
    buildTime: 6,
    effects: { researchSpeed: 20 }
  },
  DEFENSE: {
    cost: { iron: 300, silicon: 100, carbon: 50, titan: 100, uranium: 50, water: 0, gold: 0, copper: 150, cash: 12000 },
    buildTime: 8,
    effects: { planetDefense: 50 }
  },
  SPACEPORT: {
    cost: { iron: 250, silicon: 200, carbon: 150, titan: 75, uranium: 0, water: 0, gold: 10, copper: 125, cash: 15000 },
    buildTime: 10,
    effects: { fleetCapacity: 5 }
  }
};

export interface PoliticalFocus {
  name: string;
  effects: Record<string, number>;
}

export const POLITICAL_FOCUSES: Record<string, PoliticalFocus> = {
  BALANCED: {
    name: 'Balanced Development',
    effects: {}
  },
  FLEET_BUILD: {
    name: 'Fleet Construction Focus',
    effects: { shipBuildSpeed: 25, researchSpeed: -10 }
  },
  GROUND_TROOPS: {
    name: 'Ground Forces Focus',
    effects: { troopTraining: 30, shipBuildSpeed: -15 }
  },
  RESOURCE_MINING: {
    name: 'Resource Extraction Focus',
    effects: { resourceProduction: 35, shipBuildSpeed: -10, researchSpeed: -5 }
  },
  RESEARCH: {
    name: 'Scientific Research Focus',
    effects: { researchSpeed: 40, resourceProduction: -15, shipBuildSpeed: -10 }
  }
};