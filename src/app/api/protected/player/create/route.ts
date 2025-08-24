import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/database';
import { RaceType } from '@prisma/client';

const createPlayerSchema = z.object({
  name: z.string().min(1).max(50),
  race: z.nativeEnum(RaceType),
});

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, race } = createPlayerSchema.parse(body);

    // Check if user already has a player
    const existingPlayer = await prisma.player.findUnique({
      where: { userId }
    });

    if (existingPlayer) {
      return NextResponse.json(
        { error: 'Player already exists for this user' },
        { status: 400 }
      );
    }

    // Check if player name is taken
    const nameExists = await prisma.player.findFirst({
      where: { name }
    });

    if (nameExists) {
      return NextResponse.json(
        { error: 'Player name is already taken' },
        { status: 400 }
      );
    }

    // Create player with default starting resources
    const player = await prisma.player.create({
      data: {
        userId,
        name,
        race,
        // Starting resources are set by default values in schema
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Player created successfully',
      player: {
        id: player.id,
        name: player.name,
        race: player.race,
        level: player.level,
        cash: player.cash,
        resources: {
          iron: player.iron,
          silicon: player.silicon,
          carbon: player.carbon,
          titan: player.titan,
          uranium: player.uranium,
          water: player.water,
          gold: player.gold,
          copper: player.copper,
        }
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Create player error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}